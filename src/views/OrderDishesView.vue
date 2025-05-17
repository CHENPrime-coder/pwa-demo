<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import mitt from '@/plugins/mitt';

const sidebarOpen = ref(false);
const cartStore = useCartStore();
const categories = ref([
  { name: '炒菜', icon: 'mdi-view-grid-outline' },
  { name: '火锅', icon: 'mdi-fire' },
  { name: '海鲜', icon: 'mdi-fish' },
  { name: '肉类', icon: 'mdi-view-grid-outline' },
  { name: '家常菜', icon: 'mdi-home' },
  { name: '素菜', icon: 'mdi-leaf' },
  { name: '面食', icon: 'mdi-pasta' },
  { name: '西餐', icon: 'mdi-silverware-fork-knife' },
  { name: '日料', icon: 'mdi-view-grid-outline' }
]);
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
        class="border-e bg-white pt-4 !absolute !z-[30] flex"
        clipped
        :scrim="false"
      >
        <v-tabs
          class="flex flex-col flex-1 relative justify-between"
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
          <div class="overflow-y-auto max-h-[50vh] flex flex-col items-center">
            <v-tab
              v-for="category in categories"
              :key="category.name"
              class="h-auto mb-4 justify-center"
              :to="`/dishes/${category.name}`"
              :text="category.name"
              :prepend-icon="category.icon"
            />
          </div>
          <v-divider class="mb-4" />
          <v-tab
            class="h-auto mb-4 justify-center"
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
        class="flex-1 flex min-h-0"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>