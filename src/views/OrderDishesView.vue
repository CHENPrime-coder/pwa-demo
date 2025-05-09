<script setup>
import { ref } from 'vue';

const tab = ref('option-1');
const sidebarOpen = ref(false);
</script>

<template>
  <div class="flex flex-col h-full min-h-0">
    <v-app-bar>
      <v-btn
        icon="mdi-menu"
        @click="sidebarOpen = !sidebarOpen"
      />
      <span class="ml-2">菜单</span>
    </v-app-bar>
    <div class="flex flex-1 min-h-0">
      <v-navigation-drawer
        v-model="sidebarOpen"
        width="100"
        class="border-e bg-white pt-4 !absolute"
        clipped
        :scrim="false"
        style="position: relative; z-index: 201; height: 100%;"
      >
        <v-tabs
          v-model="tab"
          class="!h-[82vh] flex flex-col relative"
          color="primary"
          stacked
          direction="vertical"
        >
          <v-tab
            class="h-auto mb-4 justify-center"
            prepend-icon="mdi-view-grid-outline"
            text="全部"
            value="option-1"
          />
          <v-tab
            class="h-auto mb-4 mt-auto justify-center"
            prepend-icon="mdi-shopping-outline"
            text="购物车"
            value="option-bottom"
          />
        </v-tabs>
      </v-navigation-drawer>
      <div
        class="!p-4 flex-1 h-full min-w-0"
        style="min-height: 0;"
      >
        <span>{{ tab }}</span>
      </div>
    </div>
  </div>
</template>