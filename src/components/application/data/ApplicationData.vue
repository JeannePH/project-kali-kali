<script setup>
import {computed, onMounted, watchEffect} from "vue";
import store from "../../../store.js";
import TheSelectComponent from "./TheVersionFilterComponent.vue";
import TableComponent from "./TableComponent.vue"; // Importer TableComponent

// Utiliser useRoute pour obtenir le nom de la route actuelle.
import {useRoute} from "vue-router";

const route = useRoute();

// Colonnes sélectionnées et données en fonction de la route actuelle
const selectedColumns = computed(() => {
  switch (route.name) {
    case 'Pages':
      return store.selectedPageKeys;
    case 'Workflows':
      return store.selectedWorkflowKeys;
    case 'Variables':
      return store.selectedVariableKeys;
    case 'Composants':
      return store.selectedWwObjectKeys;
    case 'Actions':
      return store.selectedActionKeys;
    default:
      return [];
  }
});

const fetchData = () => {
  switch (route.name) {
    case 'Pages':
      store.fetchPages();
      break;
    case 'Workflows':
      store.fetchWorkflows();
      break;
    case 'Variables':
      store.fetchVariables();
      break;
    case 'Composants':
      store.fetchWwObjects();
      break;
    case 'Actions':
      store.fetchActions();
      break;
    default:
      break;
  }
};

const filteredData = computed(() => {
  switch (route.name) {
    case 'Pages':
      return store.pages.filter(row => row.cache_version === store.selectedCacheVersion);
    case 'Workflows':
      return store.workflows.filter(row => row.cache_version === store.selectedCacheVersion);
    case 'Variables':
      return store.variables.filter(row => row.cache_version === store.selectedCacheVersion);
    case 'Composants':
      return store.wwobjects.filter(row => row.cache_version === store.selectedCacheVersion);
    case 'Actions':
      return store.actions.filter(row => row.cache_version === store.selectedCacheVersion);
    default:
      return [];
  }
});

// Fetch data when the component is mounted or when the route changes
onMounted(fetchData);
watchEffect(() => {
  fetchData();
});
</script>

<template>
    <TheSelectComponent/>
    <div v-if="!filteredData.length">
      No data available.
    </div>
    <div v-else>
      <TableComponent :data="filteredData" :columns="selectedColumns"/>
    </div>
</template>

<style scoped>
</style>
