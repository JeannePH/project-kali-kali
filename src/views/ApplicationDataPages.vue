<script setup>
import store from '../store.js';
import TableComponent from "../components/application/data/TableComponent.vue";
import {computed, onMounted} from "vue";

onMounted(() => {
  store.fetchPages();
});

// Colonnes sélectionnées pour les pages
const selectedColumns = computed(() => store.selectedPageKeys);
</script>

<template>
    <div v-if="!store.pages.length">
      No data available.
    </div>
    <div v-else>
      <TableComponent :data="store.pages" :columns="selectedColumns"/>
    </div>
</template>

<style scoped>
</style>