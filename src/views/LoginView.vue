<script setup>
import logo from '@/assets/logo.svg';
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <v-img
      :src="logo"
      class="w-1/2"
      aspect-ratio="1/1"
      max-height="16rem"
    />
    <h1 class="text-5xl font-bold">
      登入
    </h1>
    <p class="text-gray-500">
      请输入您的账号和密码
    </p>
    <v-form class="w-1/2 mt-4">
      <v-text-field
        label="账号"
        variant="outlined"
        clearable
      />
      <v-text-field
        label="密码"
        type="password"
        variant="outlined"
        clearable
      />
      <v-btn
        color="primary"
        class="w-full"
      >
        登入
      </v-btn>
      <v-btn
        color="error"
        variant="text"
        class="w-full mt-2"
        @click="$router.push('/forgot-password')"
      >
        忘记密码?
      </v-btn>
    </v-form>
  </div>
</template>