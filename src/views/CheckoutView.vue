<script setup>
import mitt from '@/plugins/mitt';
</script>

<template>
  <v-app-bar>
    <template #prepend>
      <v-app-bar-nav-icon
        icon="mdi-arrow-left"
        @click="mitt.emit('back')"
      />
    </template>
    <v-app-bar-title>提交订单</v-app-bar-title>
  </v-app-bar>
  <v-main>checkout</v-main>
</template>