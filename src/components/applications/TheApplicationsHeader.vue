<script setup>
import TheAddApplicationButton from "../buttons/TheAddApplicationButton.vue";

const props = defineProps(['appName', 'appObject']);
</script>

<template>
  <div class="header">
    <div class="container-space-between-align-center">
      <h2>Liste des applications</h2>
      <div class="container-icon">
        <img src="../../assets/chevron_right.svg" alt="chevron">
      </div>
    </div>
    <div class="container-flex-end-align-center">
      <the-add-application-button />
    </div>
  </div>
</template>

<style scoped>
</style>