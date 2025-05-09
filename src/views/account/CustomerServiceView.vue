<script setup lang="ts">
import mitt from '@/plugins/mitt';

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
    <v-main>客户服务</v-main>
  </div>
</template>