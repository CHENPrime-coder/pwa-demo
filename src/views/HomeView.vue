<script setup>
import { ref } from 'vue';
import PWABadge from '../components/PWABadge.vue';

const value = ref(0);
</script>

<template>
  <v-main>
    <router-view />
  </v-main>
  <v-bottom-navigation
    v-model="value"
    grow
    mandatory
  >
    <v-btn to="dishes">
      <v-icon icon="mdi-food-fork-drink" />
      <span>点菜</span>
    </v-btn>

    <v-btn to="history">
      <v-icon icon="mdi-history" />
      <span>历史订单</span>
    </v-btn>

    <v-btn to="account">
      <v-icon icon="mdi-account-circle" />
      <span>我的</span>
    </v-btn>
  </v-bottom-navigation>
  <PWABadge />
</template>