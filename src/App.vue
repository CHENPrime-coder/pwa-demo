<script setup>
import TheCommonDialog from './components/TheCommonDialog.vue';
import TheToast from './components/TheToast.vue';
import mitt from './plugins/mitt';

mitt.on('back', () => {
  window.history.go(-1);
});
</script>

<template>
  <v-responsive>
    <v-app>
      <router-view />
    </v-app>
  </v-responsive>
  <the-common-dialog />
  <the-toast />
</template>