<script setup>
import { ref, watch } from 'vue';
import DishesItem from '@/components/DishesItem.vue';
import { useCartStore } from '@/stores/cart';
import router from '@/plugins/router';

const cartStore = useCartStore();
const searchKeyword = ref('');
const dishesInCart = ref(cartStore.cartItems);
const results = ref(dishesInCart.value);

watch(
  () => cartStore.cartItems,
  (newItems) => {
    dishesInCart.value = newItems;
    results.value = newItems;
  },
  { immediate: true }
);

const handleSearchClick = () => {
  if (searchKeyword.value === '') {
    results.value = dishesInCart.value;
  } else {
    results.value = dishesInCart.value.filter(dish =>
      dish.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
};

const handleCheckoutClick = () => {
  if (cartStore.cartTotalCount === 0) {
    alert('购物车为空，请添加菜品');
    return;
  }

  router.push('/checkout');
};
</script>

<template>
  <div class="flex flex-col h-full w-full flex-1">
    <!-- 搜索框 -->
    <div class="flex items-center justify-center !pt-4 !px-4">
      <v-text-field
        v-model="searchKeyword"
        class="w-[80vw]"
        label="搜索菜品 (名称)"
        variant="outlined"
      >
        <template #append-inner>
          <v-btn
            icon="mdi-magnify"
            variant="text"
            @click="handleSearchClick"
          />
        </template>
      </v-text-field>
    </div>
    <div
      id="dishes"
      class="overflow-y-auto flex-1 flex-col flex h-auto min-h-0"
    >
      <div class="h-[1px]">
        <dishes-item
          v-for="dish in results"
          :key="dish.id"
          :dish="dish"
        />
        <div class="h-[15rem]" />
      </div>
    </div>
    <!-- 结算区域：总价、结算按钮 -->
    <div class="flex items-center justify-between !p-4 border-t">
      <span class="text-3xl font-bold text-red-500">{{ cartStore.cartTotalPrice }} 元</span>
      <v-btn
        color="primary"
        @click="handleCheckoutClick()"
      >
        去结算
      </v-btn>
    </div>
  </div>
</template>