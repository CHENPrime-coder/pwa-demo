<script setup>
import { ref } from 'vue';
import mitt from '@/plugins/mitt';

const message = ref('');
const show = ref(false);
const timeout = ref(3000);
const color = ref('success');

mitt.on('showToast', ({ msg, duration = 2000, status = 'success' }) => {
    // TODO: console log
    console.log('showToast', msg, duration, status);
    message.value = msg;
    timeout.value = duration;
    color.value = status;
    show.value = true;

    setTimeout(() => {
        show.value = false;
    }, timeout.value);
});
</script>

<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="timeout"
    location="top"
    :text="message"
  />
</template>