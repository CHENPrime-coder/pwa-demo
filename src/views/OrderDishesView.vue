<script setup>
import { ref } from 'vue';
import PWABadge from '@/components/PWABadge.vue';

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
      <PWABadge />
    </v-app-bar>
    <div class="flex flex-1 min-h-0">
      <v-navigation-drawer
        v-if="sidebarOpen"
        v-model="sidebarOpen"
        width="100"
        class="border-e bg-white flex-shrink-0 !top-0 pt-4"
        clipped
        :scrim="false"
        style="position: relative; z-index: 201; height: 100%;"
      >
        <v-tabs
          v-model="tab"
          class="h-full flex flex-col"
          color="primary"
          stacked
          direction="vertical"
        >
          <v-tab
            class="h-auto mb-4"
            prepend-icon="mdi-account"
            text="Option 1"
            value="option-1"
          />
          <v-tab
            class="h-auto mb-4"
            prepend-icon="mdi-lock"
            text="Option 2"
            value="option-2"
          />
          <v-tab
            class="h-auto mb-4"
            prepend-icon="mdi-access-point"
            text="Option 3"
            value="option-3"
          />
          <v-tab
            class="h-auto mb-4 mt-auto"
            prepend-icon="mdi-access-point"
            text="Bottom"
            value="option-bottom"
          />
        </v-tabs>
      </v-navigation-drawer>
      <div
        class="!p-4 flex-1 h-full bg-amber-300 min-w-0"
        style="min-height: 0;"
      >
        <span>{{ tab }}</span>
      </div>
    </div>
  </div>
</template>