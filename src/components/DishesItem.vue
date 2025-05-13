<script setup>
const { dish } = defineProps({
  dish: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div class="mb-4 mx-4 bg-white rounded-lg shadow-md flex">
    <v-img
      src="https://ui-avatars.com/api/?name=admin"
      class="rounded-bl-lg rounded-tl-lg !max-w-[10vw] !min-w-[6rem]"
      cover
    />
    <div class="!p-4 flex flex-1">
      <div class="flex-1">
        <h2 class="font-bold">
          {{ dish.name }}
        </h2>
        <p class="text-red-500">
          {{ dish.price }} 元
        </p>
        <div class="break-all">
          <p>{{ dish.description }}{{ dish.description }}{{ dish.description }}{{ dish.description }}</p>
          <div class="flex items-center justify-end gap-4 ml-4">
            <v-btn icon="mdi-plus" />
            <v-btn icon="mdi-minus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>