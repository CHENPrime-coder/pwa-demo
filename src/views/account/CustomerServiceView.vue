<script setup lang="ts">
import mitt from '@/plugins/mitt';
import qrcode from '@/assets/qrcode.png';
import { ref } from 'vue';

const phoneNumber = ref('1234567890'); // 示例电话号码
const handleCopyClick = () => {
  // 复制电话号码到剪贴板
  navigator.clipboard.writeText(phoneNumber.value).then(() => {
    mitt.emit('showToast', {
      msg: '电话号码已复制到剪贴板',
    });
  }).catch(err => {
    console.error('复制失败:', err);
    mitt.emit('showToast', {
      msg: '复制失败，请重试',
    });
  });
};
const handleSaveClick = () => {
  // 保存二维码到本地
  const link = document.createElement('a');
  link.href = qrcode;
  link.download = 'qrcode.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  mitt.emit('showToast', {
    msg: '二维码已保存',
  });
};
</script>

<template>
  <div class="flex flex-col h-full">
    <v-app-bar>
      <template #prepend>
        <v-app-bar-nav-icon
          icon="mdi-arrow-left"
          @click="mitt.emit('back')"
        />
      </template>

      <v-app-bar-title>客户服务</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <!-- 联系电话展示区（点击左侧复制图标复制） -->
      <v-list class="my-4">
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          :subtitle="'电话: '+phoneNumber"
          title="John Leider"
        >
          <template #append>
            <v-btn
              icon="mdi-content-copy"
              size="small"
              variant="text"
              @click="handleCopyClick"
            />
          </template>
        </v-list-item>
      </v-list>
      <!-- 微信好友二维码 -->
      <h1 class="mx-4">
        点击就保存好友二维码:
      </h1>
      <v-img
        class="mx-4"
        :src="qrcode"
        @click="handleSaveClick"
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
    </v-main>
  </div>
</template>