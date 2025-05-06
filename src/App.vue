<script setup>
import PWABadge from './components/PWABadge.vue'
</script>

<template>
  <v-responsive>
    <v-app>
      <v-main>
        <router-view ></router-view>
      </v-main>
      <v-bottom-navigation grow>
        <v-btn to="/dishes">
          <v-icon icon="mdi-food-fork-drink"/>
          <span>点菜</span>
        </v-btn>

        <v-btn to="/history">
          <v-icon icon="mdi-history"/>
          <span>历史订单</span>
        </v-btn>

        <v-btn to="/account">
          <v-icon icon="mdi-account-circle"/>
          <span>我的</span>
        </v-btn>
      </v-bottom-navigation>
      <PWABadge/>
    </v-app>
  </v-responsive>
</template>