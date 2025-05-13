<script setup>
import logo from '@/assets/logo.svg';
import { ref, useTemplateRef } from 'vue';
import { useUserStore } from '@/stores/user';
import rules from '@/tools/rules';
import mitt from '@/plugins/mitt';
import router from '@/plugins/router';

const username = ref('admin');
const password = ref('123456');
const form = useTemplateRef('form');

const handleLoginClick = async () => {
  const result = await form.value.validate();
  if (!result.valid) {
    return;
  }
  const userStore = useUserStore();
  if (password.value !== '123456') {
    mitt.emit('showToast', {
      msg: '密码错误',
      status: 'error',
    });
    return;
  }
  userStore.setUser({
    name: username.value,
    id: Math.floor(Math.random() * 1000),
  });
  mitt.emit('showToast', {
    msg: '登录成功',
  });
  localStorage.setItem('user', JSON.stringify(userStore.user));
  router.push('/dishes/all');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <v-img
      :src="logo"
      class="w-5/6 max-w-[20rem]"
      aspect-ratio="1/1"
      max-height="16rem"
    />
    <h1 class="text-5xl font-bold">
      登入
    </h1>
    <p class="text-gray-500">
      请输入您的账号和密码
    </p>
    <v-form
      ref="form"
      class="w-5/6 mt-4 max-w-[20rem]"
    >
      <v-text-field
        v-model="username"
        label="账号 (随意)"
        density="compact"
        variant="outlined"
        :rules="[rules.required]"
        clearable
      />
      <v-text-field
        v-model="password"
        label="密码 (123456)"
        density="compact"
        type="password"
        variant="outlined"
        :rules="[rules.required]"
        clearable
      />
      <v-btn
        variant="tonal"
        color="primary"
        class="w-full"
        @click="handleLoginClick"
      >
        登入
      </v-btn>
      <v-btn
        variant="text"
        class="w-full mt-2"
        @click="mitt.emit('showToast', { msg: '密码是123456' })"
      >
        忘记密码?
      </v-btn>
    </v-form>
  </div>
</template>