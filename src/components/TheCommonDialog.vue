<!-- Global common dialog, with confirm & cancel callback -->
 <script setup>
import { ref } from 'vue';
import mitt from '@/plugins/mitt';

const message = ref('');
const cancelCallback = ref(() => { dialog.value = false; });
const confirmCallback = ref(() => { dialog.value = false; });
const dialog = ref(false);
const cancelVisible = ref(false);

mitt.on('openDialog', ({ msg, callbackConfirm = null, cancelable = false, callbackCancel = null }) => {
    // TODO: console log
    console.log('openDialog', msg, callbackConfirm, cancelable, callbackCancel);
    message.value = msg;
    cancelVisible.value = cancelable;
    dialog.value = true;
    if (callbackConfirm) confirmCallback.value = callbackConfirm;
    if (callbackCancel) cancelCallback.value = callbackCancel;
});
mitt.on('closeDialog', () => {
    dialog.value = false;
    confirmCallback.value = () => { dialog.value = false; };
    cancelCallback.value = () => { dialog.value = false; };
});
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="400"
    class="!w-[80vw] !max-w-[80vw]"
  >
    <v-card
      title="提示"
    >
      <v-card-text>
        <p>
          {{ message }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="cancelVisible"
          text
          @click="cancelCallback()"
        >
          取消
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="confirmCallback()"
        >
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>