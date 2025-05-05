<script setup>
import PWABadge from './components/PWABadge.vue'

function demo() {
  console.log('demo')
}
</script>

<template>
  <input class="btn btn-primary" type="button" value="demo" @click="demo"/>
  <br>
  <br>
  <PWABadge />
</template>