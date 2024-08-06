<script setup>
import TheAddApplicationDataButton from "../TheAddApplicationDataButton.vue";
const props = defineProps(['appName', 'appObject']);
</script>

<template>
  <div class="header">
    <div class="container-space-between-align-center">
      <h2>{{ props.appName }}</h2>
      <div class="container-icon">
        <img src="../../assets/chevron_right.svg" alt="chevron">
      </div>
      <h2 class="app-object">{{ props.appObject }}</h2>
    </div>
    <div class="container-flex-end-align-center">
      <TheAddApplicationDataButton />
    </div>
  </div>
</template>

<style scoped>


</style>