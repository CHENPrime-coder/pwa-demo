<script setup>
import mitt from '@/plugins/mitt';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const user = useUserStore();
const addresses = ref(user.userAddresses);

</script>

<template>
  <v-app-bar>
    <template #prepend>
      <v-app-bar-nav-icon
        icon="mdi-arrow-left"
        @click="mitt.emit('back')"
      />
    </template>
    <v-app-bar-title>提交订单</v-app-bar-title>
  </v-app-bar>
  <v-main>
    <h1>当前地址</h1>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(address, index) in addresses"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title>{{ address.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ address.phone }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ address.address }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-main>
</template>