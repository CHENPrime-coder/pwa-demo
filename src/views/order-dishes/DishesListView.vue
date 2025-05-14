<script setup>
import { ref } from 'vue';
import DishesItem from '@/components/DishesItem.vue';
import { useCartStore } from '@/stores/cart';

const searchKeyword = ref('');
const testDishes = ref([
  {
    id: 1,
    name: '鱼香肉丝',
    description: 'Description of Dish 1',
    price: 10,
    category: '炒菜',
    cover: 'https://example.com/dish1.jpg',
    selectedCount: 0
  },
  {
    id: 2,
    name: '宫保鸡丁',
    description: 'Description of Dish 2',
    price: 12,
    category: '炒菜',
    cover: 'https://example.com/dish2.jpg',
    selectedCount: 0
  },
  {
    id: 3,
    name: '麻辣火锅',
    description: 'Description of Dish 3',
    price: 15,
    category: '火锅',
    cover: 'https://example.com/dish3.jpg',
    selectedCount: 0
  },
  {
    id: 4,
    name: '清蒸鱼',
    description: 'Description of Dish 4',
    price: 20,
    category: '海鲜',
    cover: 'https://example.com/dish4.jpg',
    selectedCount: 0
  },
  {
    id: 5,
    name: '红烧肉',
    description: 'Description of Dish 5',
    price: 18,
    category: '肉类',
    cover: 'https://example.com/dish5.jpg',
    selectedCount: 0
  },
  {
    id: 6,
    name: '西红柿炒蛋',
    description: 'Description of Dish 6',
    price: 8,
    category: '家常菜',
    cover: 'https://example.com/dish6.jpg',
    selectedCount: 0
  },
  {
    id: 7,
    name: '酸辣土豆丝',
    description: 'Description of Dish 7',
    price: 6,
    category: '家常菜',
    cover: 'https://example.com/dish7.jpg',
    selectedCount: 0
  },
  {
    id: 8,
    name: '蒜蓉西兰花',
    description: 'Description of Dish 8',
    price: 9,
    category: '素菜',
    cover: 'https://example.com/dish8.jpg',
    selectedCount: 0
  },
  {
    id: 9,
    name: '清炒时蔬',
    description: 'Description of Dish 9',
    price: 7,
    category: '素菜',
    cover: 'https://example.com/dish9.jpg',
    selectedCount: 0
  },
  {
    id: 10,
    name: '牛肉面',
    description: 'Description of Dish 10',
    price: 14,
    category: '面食',
    cover: 'https://example.com/dish10.jpg',
    selectedCount: 0
  },
  {
    id: 11,
    name: '炸酱面',
    description: 'Description of Dish 11',
    price: 11,
    category: '面食',
    cover: 'https://example.com/dish11.jpg',
    selectedCount: 0
  },
  {
    id: 12,
    name: '牛排',
    description: 'Description of Dish 12',
    price: 30,
    category: '西餐',
    cover: 'https://example.com/dish12.jpg',
    selectedCount: 0
  },
  {
    id: 13,
    name: '意大利面',
    description: 'Description of Dish 13',
    price: 25,
    category: '西餐',
    cover: 'https://example.com/dish13.jpg',
    selectedCount: 0
  },
  {
    id: 14,
    name: '披萨',
    description: 'Description of Dish 14',
    price: 28,
    category: '西餐',
    cover: 'https://example.com/dish14.jpg',
    selectedCount: 0
  },
  {
    id: 15,
    name: '寿司',
    description: 'Description of Dish 15',
    price: 35,
    category: '日料',
    cover: 'https://example.com/dish15.jpg',
    selectedCount: 0
  },
  {
    id: 16,
    name: '拉面',
    description: 'Description of Dish 16',
    price: 20,
    category: '日料',
    cover: 'https://example.com/dish16.jpg',
    selectedCount: 0
  }
]);
const cartStore = useCartStore();

const results = ref(testDishes.value);
const handleSearchClick = () => {
  if (searchKeyword.value === '') {
    results.value = testDishes.value;
  } else {
    results.value = testDishes.value.filter(dish =>
      dish.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }
  loadFromCart();
};
const loadFromCart = () => {
  const cartDishes = cartStore.cart;
  results.value.forEach(dish => {
    const cartDish = cartDishes.find(item => item.id === dish.id);
    if (cartDish) {
      dish.selectedCount = cartDish.selectedCount;
    }
  });
};

loadFromCart();
</script>

<template>
  <div class="flex flex-col max-h-[50rem] h-[50rem] overflow-hidden">
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
    <div class="overflow-y-auto flex-1 min-h-0">
      <dishes-item
        v-for="dish in results"
        :key="dish.id"
        :dish="dish"
      />
      <div class="h-[20rem]" />
    </div>
  </div>
</template>