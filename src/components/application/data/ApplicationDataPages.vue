<script setup>
import store from '../../../store.js';
import TableComponent from "./TableComponent.vue";
import {computed, onMounted} from "vue";

onMounted(() => {
  store.fetchPages();
});

// Colonnes sélectionnées pour les pages
const selectedColumns = computed(() => store.selectedPageKeys);
</script>

<template>
  <div class="container">
    <div v-if="!store.pages.length">
      No data available.
    </div>
    <div v-else>
      <TableComponent :data="store.pages" :columns="selectedColumns"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 32px;
  min-width: 100%;
}
</style>