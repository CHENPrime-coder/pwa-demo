<script setup>
import { ref } from 'vue';
import mitt from '@/plugins/mitt';
const { dish } = defineProps({
  dish: {
    type: Object,
    required: true
  }
});

const showImageDetail = ref(false);
const selectedCount = ref(dish.selectedCount);
const handleAddClick = () => {
  selectedCount.value++;
  notifyDataChange(true);
};
const handleMinusClick = () => {
  if (selectedCount.value > 0) {
    selectedCount.value--;
  }
  notifyDataChange(false);
};
const notifyDataChange = (isAdd) => {
  mitt.emit('update:selectedCount', {
    dish: dish,
    isAdd: isAdd
  });
};
</script>

<template>
  <div
    class="mt-4 mx-4 bg-white rounded-lg shadow-md flex"
  >
    <v-overlay
      v-model="showImageDetail"
      class="flex justify-center items-center"
    >
      <v-img
        src="https://ui-avatars.com/api/?name=占位"
        class="w-[100vw]"
        cover
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            />
          </div>
        </template>
      </v-img>
    </v-overlay>
    <v-img
      src="https://ui-avatars.com/api/?name=占位"
      class="rounded-bl-lg rounded-tl-lg !max-w-[10vw] !min-w-[8rem]"
      cover
      @click="showImageDetail = true"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          />
        </div>
      </template>
    </v-img>
    <div class="!p-4 flex flex-1">
      <div class="flex-1 flex flex-col">
        <h2 class="font-bold">
          {{ dish.name }}
        </h2>
        <p class="text-red-500">
          {{ dish.price }} 元
        </p>
        <div class="break-all flex-1 flex flex-col">
          <p class="flex-1">
            {{ dish.description }}{{ dish.description }}{{ dish.description }}{{ dish.description }}
          </p>
          <div class="flex items-center justify-end gap-4 ml-4">
            <v-btn
              variant="text"
              density="compact"
              icon="mdi-plus"
              @click="handleAddClick"
            />
            <v-btn
              variant="text"
              density="compact"
              icon="mdi-minus"
              @click="handleMinusClick"
            />
          </div>
        </div>
      </div>
    </div>
    <v-badge
      :model-value="selectedCount != 0"
      color="error"
      :content="selectedCount"
    />
  </div>
</template>