<script setup>
import { colors } from '@/tools/color';
import { ref } from 'vue';
import mitt from '@/plugins/mitt';

const username = ref('张三');
const uid = ref('1234567890');
const year = new Date().getFullYear();
const version = ref('1.0.0');
const appName = ref('点餐系统');
const modifyUsernameDialog = ref(false);

const modifyUsername = () => {
  // TODO: Perform username modification logic here
  modifyUsernameDialog.value = false;
};
const openDeleteAccountConfirmDialog = () => {
  mitt.emit('openDialog', {
    msg: '确定注销账号吗？',
    callbackConfirm: () => {
      // TODO: Perform account deletion logic here
      console.log('Account deleted');
      mitt.emit('closeDialog');
    },
    cancelable: true,
  });
};
const openLogoutConfirmDialog = () => {
  mitt.emit('openDialog', {
    msg: '确定退出登录吗？',
    cancelable: true,
    callbackConfirm: () => {
      // TODO: Perform logout logic here
      console.log('Logged out');
      mitt.emit('closeDialog');
    },
  });
};
</script>

<template>
  <div class="flex flex-col items-center">
    <v-img
      class="w-[25vw] h-[25vw] rounded-full mt-16 mb-8 !max-w-[168px] !max-h-[168px]"
      :src="`https://ui-avatars.com/api/?name=${username}`"
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
        {{ username }}
      </p>
      <p>UID: {{ uid }}</p>
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
    <v-card
      title="修改用户名"
    >
      <v-card-text>
        <v-text-field
          v-model="username"
          label="用户名"
          outlined
          class="w-full"
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
  </v-dialog>
</template>