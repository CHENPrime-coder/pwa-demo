<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import mitt from '@/plugins/mitt';

const sidebarOpen = ref(false);
const cartStore = useCartStore();
cartStore.loadCart();

mitt.on('update:selectedCount', ({ dish, isAdd }) => {
  cartStore.updateItemCount(dish, isAdd);
});
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
        class="border-e bg-white pt-4 !absolute !z-[30]"
        clipped
        :scrim="false"
      >
        <v-tabs
          class="!h-[82vh] flex flex-col relative"
          color="primary"
          stacked
          direction="vertical"
        >
          <v-tab
            class="h-auto mb-4 justify-center"
            prepend-icon="mdi-view-grid-outline"
            text="全部"
            to="/dishes/all"
          />
          <v-tab
            class="h-auto mb-4 mt-auto justify-center"
            to="/dishes/cart"
          >
            <v-badge
              color="error"
              :content="cartStore.cartTotalCount"
              :model-value="cartStore.cartTotalCount != 0"
            >
              <v-icon>mdi-shopping-outline</v-icon>
            </v-badge>
            <span>购物车</span>
          </v-tab>
        </v-tabs>
      </v-navigation-drawer>
      <div
        class="flex-1 h-full"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>