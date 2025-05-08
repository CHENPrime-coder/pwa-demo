<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';

// periodic sync is disabled, change the value to enable it, the period is in milliseconds
const period = 0;

const swActivated = ref(false);
// PWA安装相关状态
const installable = ref(false);
const installPrompt = ref(null);
const debugMessage = ref('等待检测PWA安装状态...');
const isManualInstallShown = ref(false); // 强制显示安装按钮的标志
// 调试信息开关
const debug = ref(false);

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 * @param {string} swUrl
 * @param {ServiceWorkerRegistration} r
 */
function registerPeriodicSync(swUrl, r) {
  if (period <= 0) return;

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return;

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    });

    if (resp?.status === 200)
      await r.update();
  }, period);
}


const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    debugMessage.value += '【Service Worker已注册】';
    if (period <= 0) return;
    if (r?.active?.state === 'activated') {
      swActivated.value = true;
      registerPeriodicSync(swUrl, r);
    }
    else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        /** @type {ServiceWorker} */
        const sw = e.target;
        swActivated.value = sw.state === 'activated';
        if (swActivated.value)
          registerPeriodicSync(swUrl, r);
      });
    }
  },
});

const message = computed(() => {
  if (needRefresh.value)
    return 'New content available, click on reload button to update.';
  return '';
});

function close() {
  needRefresh.value = false;
}

// 添加PWA安装功能
onMounted(() => {
  console.log('PWABadge组件已加载，正在检测PWA安装条件...');

  // 检查是否有PWA安装功能
  if ('serviceWorker' in navigator) {
    debugMessage.value += '【浏览器支持Service Worker】';
    
    // 检查manifest是否添加
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      debugMessage.value += '【manifest已配置】';
    } else {
      debugMessage.value += '【警告：未检测到manifest配置】';
    }
    
    // 检查Service Worker是否已注册
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        debugMessage.value += '【Service Worker已注册】';
      } else {
        debugMessage.value += '【警告：Service Worker未注册】';
      }
    });
  } else {
    debugMessage.value += '【警告：浏览器不支持Service Worker】';
  }

  // 监听beforeinstallprompt事件，这个事件会在PWA可以安装时触发
  window.addEventListener('beforeinstallprompt', (e) => {
    // 阻止Chrome 67及更早版本自动显示安装提示
    e.preventDefault();
    // 保存事件，以便稍后使用
    installPrompt.value = e;
    // 更新UI以表明可以安装PWA
    installable.value = true;
    debugMessage.value += '【检测到可安装的PWA】';
    console.log('beforeinstallprompt事件已触发', e);
  });

  // 当PWA已经安装时，隐藏安装按钮
  window.addEventListener('appinstalled', () => {
    // 应用已安装，隐藏安装按钮
    installable.value = false;
    // 清除保存的prompt
    installPrompt.value = null;
    debugMessage.value += '【PWA已成功安装】';
    console.log('PWA 已经成功安装');
  });
  
  // 10秒后如果未检测到beforeinstallprompt事件，显示辅助提示
  setTimeout(() => {
    if (!installable.value) {
      isManualInstallShown.value = true;
      debugMessage.value += '【未检测到beforeinstallprompt事件，已显示辅助安装按钮】';
    }
  }, 5000);
});

// 处理安装点击事件
async function installPWA() {
  if (!installPrompt.value) {
    debugMessage.value += '【无法安装：没有捕获到安装提示事件】';
    window.alert('请使用浏览器菜单中的"添加到主屏幕"或"安装"选项来安装此应用');
    return;
  }

  // 显示安装提示
  const result = await installPrompt.value.prompt();
  
  // 等待用户对提示的响应
  // 如果用户接受，promise解析为一个acceptance对象
  console.log('安装结果:', result);
  debugMessage.value += `【用户响应安装提示：${JSON.stringify(result)}】`;
  
  // 无论用户如何响应，我们都不能再次使用该prompt
  installPrompt.value = null;
  installable.value = false;
}

// 显示手动安装指南
function showManualInstallGuide() {
  if (isAndroid()) {
    window.alert('在Chrome浏览器中：点击菜单按钮 (⋮) -> 安装应用/添加到主屏幕');
  } else {
    window.alert('请使用浏览器菜单中的"添加到主屏幕"或"安装"选项来安装此应用');
  }
}

// 检测是否为安卓设备
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}
</script>

<template>
  <div class="absolute top-0 right-0">
    <v-card
      v-if="needRefresh"
      class="top-4 right-4 w-96 shadow-sm p-4"
      aria-labelledby="toast-message"
      role="alert"
      title="PWA更新提示"
      :text="message"
    >
      <template #actions>
        <v-btn @click="updateServiceWorker()">
          Reload
        </v-btn>
        <v-btn
          variant="outlined"
          @click="close"
        >
          Close
        </v-btn>
      </template>
    </v-card>
  
    <div class="absolute top-4 right-4">
      <!-- PWA安装按钮 - 当检测到beforeinstallprompt时显示 -->
      <v-btn 
        v-if="installable" 
        class="btn btn-outline btn-primary" 
        type="button"
        @click="installPWA"
      >
        📱安装此应用
      </v-btn>
    
      <!-- 手动安装按钮 - 当未检测到beforeinstallprompt但可能是PWA时显示 -->
      <v-btn 
        v-if="isManualInstallShown" 
        class="btn btn-outline btn-secondary" 
        type="button"
        @click="showManualInstallGuide"
      >
        📲如何安装
      </v-btn>
    </div>

    <!-- 调试信息面板 -->
    <v-card
      v-if="debug"
      title="调试信息"
      class="top-16 right-4 w-96"
      :text="debugMessage"
    >
      <v-card-actions>
        <v-btn
          @click="debug = false"
        >
          关闭
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-btn
      v-else
      class="absolute top-16 right-4 w-6"
      @click="debug = !debug"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      ><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
        fill="currentColor"
        d="m6.85 12l2.45 2.45q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l3.175-3.175q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7zM7 20v1h10v-1zM7 4h10V3H7zm10.15 8L14.7 9.55q-.3-.3-.287-.7t.287-.7q.3-.3.713-.312t.712.287L19.3 11.3q.3.3.3.7t-.3.7l-3.175 3.175q-.3.3-.712.288t-.713-.313q-.275-.3-.287-.7t.287-.7zM7 4V3zm0 16v1zm0 3q-.825 0-1.412-.587T5 21v-3q0-.425.288-.712T6 17t.713.288T7 18h10q0-.425.288-.712T18 17t.713.288T19 18v3q0 .825-.587 1.413T17 23zM7 1h10q.825 0 1.413.588T19 3v3q0 .425-.288.713T18 7t-.712-.288T17 6H7q0 .425-.288.713T6 7t-.712-.288T5 6V3q0-.825.588-1.412T7 1"
      /></svg>
    </v-btn>
  </div>
</template>