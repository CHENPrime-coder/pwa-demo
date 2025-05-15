<script setup>

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <v-main class="flex-1 bg-zinc-100">
      <router-view />
    </v-main>
    <v-bottom-navigation
      grow
      mandatory
      class="!left-0 !w-full"
    >
      <v-btn to="/dishes">
        <v-icon icon="mdi-food-fork-drink" />
        <span>点菜</span>
      </v-btn>

      <v-btn to="/history">
        <v-icon icon="mdi-history" />
        <span>历史订单</span>
      </v-btn>

      <v-btn to="/account">
        <v-icon icon="mdi-account-circle" />
        <span>我的</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>