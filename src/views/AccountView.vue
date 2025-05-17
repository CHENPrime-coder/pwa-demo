<script setup>
import { colors } from '@/tools/colors';
import { ref, useTemplateRef, onMounted } from 'vue';
import mitt from '@/plugins/mitt';
import { useUserStore } from '@/stores/user';
import rules from '@/tools/rules';
import router from '@/plugins/router';

import { useRegisterSW } from 'virtual:pwa-register/vue';
// periodic sync is disabled, change the value to enable it, the period is in milliseconds
const period = 0;

const user = useUserStore();
const year = new Date().getFullYear();
const version = ref('1.0.0');
const appName = ref('点餐系统');
const modifyUsernameDialog = ref(false);
const form = useTemplateRef('form');
const username = ref(user.userName);

const deferredPrompt = ref(null);
const swActivated = ref(false);

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

const checkForUpdate = async () => {
  if (swActivated.value) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      registration.update();
      mitt.emit('showToast', { msg: '正在检查更新...' });
    } else {
      mitt.emit('showToast', { msg: '没有可用的更新' });
    }
  } else {
    mitt.emit('showToast', { msg: '没有可用的更新' });
  }
};

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // 防止 Chrome 67 及更早版本自动显示安装提示
    e.preventDefault();
    // 存储事件以便稍后触发
    deferredPrompt.value = e;
    // 可选：更新 UI 通知用户 PWA 可以安装
    // console.log('beforeinstallprompt event fired');
  });
});

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      mitt.emit('showToast', { msg: '应用安装成功' });
    } else {
      mitt.emit('showToast', { msg: '用户取消安装' });
    }
    deferredPrompt.value = null;
  } else {
    // deferredPrompt.value 为 null 有几种情况：
    // 1. PWA 已经安装
    // 2. 浏览器不支持 'beforeinstallprompt' 事件 (例如桌面版 Safari, Firefox 早期版本)
    // 3. 'beforeinstallprompt' 事件尚未触发 (例如，PWA 不符合安装条件)
    // 4. 用户已经拒绝过安装提示 (某些浏览器可能不会再次提示)
    mitt.emit('showToast', { msg: '应用已是最新版本或无法发起安装提示。' });
  }
};

const modifyUsername = async () => {
  const isValid = (await form.value.validate()).valid;
  if (!isValid) {
    return;
  }
  user.setUsername(username.value);
  modifyUsernameDialog.value = false;
  mitt.emit('showToast', {
    msg: '用户名修改成功',
  });
};
const openDeleteAccountConfirmDialog = () => {
  mitt.emit('openDialog', {
    msg: '确定注销账号吗？',
    callbackConfirm: () => {
      mitt.emit('closeDialog');
      user.logout();
      router.push('/login');
      mitt.emit('showToast', {
        msg: '已注销账户',
      });
    },
    cancelable: true,
  });
};
const openLogoutConfirmDialog = () => {
  mitt.emit('openDialog', {
    msg: '确定退出登录吗？',
    cancelable: true,
    callbackConfirm: () => {
      mitt.emit('closeDialog');
      user.logout();
      router.push('/login');
      mitt.emit('showToast', {
        msg: '已退出登录',
      });
    },
  });
};
</script>

<template>
  <div class="flex flex-col items-center">
    <v-img
      class="w-[25vw] h-[25vw] rounded-full mt-16 mb-8 !max-w-[168px] !max-h-[168px]"
      :src="`https://ui-avatars.com/api/?name=${user.userName}`"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          />
        </div>
      </template>
    </v-img>
    <div class="flex flex-col items-center">
      <p class="text-3xl font-bold">
        {{ user.userName }}
      </p>
      <p>UID: {{ user.userId }}</p>
    </div>
    <div class="w-[80vw] shadow-sm mt-8">
      <v-list class="!p-0">
        <v-list-item
          color="primary"
          append-icon="mdi-chevron-right"
          prepend-icon="mdi-map-marker"
          title="我的地址"
          to="/address-management"
        />
        <v-list-item
          color="primary"
          append-icon="mdi-chevron-right"
          prepend-icon="mdi-account-edit"
          title="修改用户名"
          @click="modifyUsernameDialog = true"
        />
        <v-list-item
          color="primary"
          append-icon="mdi-chevron-right"
          prepend-icon="mdi-download"
          title="安装应用程序"
          @click="installApp"
        />
        <v-list-item
          color="primary"
          append-icon="mdi-chevron-right"
          prepend-icon="mdi-update"
          title="检查应用更新"
          @click="checkForUpdate"
        />
        <v-divider />
        <v-list-item
          color="primary"
          append-icon="mdi-chevron-right"
          prepend-icon="mdi-headset"
          title="客户服务"
          to="/customer-service"
        />
        <v-list-item
          color="primary"
          append-icon="mdi-chevron-right"
          prepend-icon="mdi-logout"
          title="退出登录"
          @click="openLogoutConfirmDialog"
        />
        <v-list-item
          :base-color="colors.danger"
          append-icon="mdi-chevron-right"
          prepend-icon="mdi-delete"
          title="注销账号"
          @click="openDeleteAccountConfirmDialog"
        />
      </v-list>
    </div>
    <!-- Bottom App info(version...) text -->
    <div class="w-[80vw] mt-8 text-center">
      <p class="text-sm text-gray-500">
        {{ appName }}
      </p>
      <p class="text-sm text-gray-500">
        Version {{ version }}
      </p>
      <p class="text-sm text-gray-500">
        © {{ year }} CHENPrime-Coder
      </p>
    </div>
  </div>
  <v-dialog
    v-model="modifyUsernameDialog"
    width="400"
    class="!w-[80vw] !max-w-[80vw]"
    :style="{ 'max-width': '80vw' }"
  >
    <v-form ref="form">
      <v-card title="修改用户名">
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            label="用户名"
            variant="outlined"
            class="w-full"
            clearable
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="modifyUsernameDialog = false"
          >
            取消
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="modifyUsername"
          >
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  <v-dialog
    v-model="needRefresh"
    width="400"
  >
    <v-card title="发现新版本">
      <v-card-text>检测到有新版本，是否立即更新？</v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="needRefresh = false"
        >
          稍后
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="updateServiceWorker()"
        >
          立即更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>