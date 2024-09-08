<script setup>
import {computed, onMounted, watchEffect} from "vue";
import ApplicationDataTableVersionFilter from "./ApplicationDataTableVersionFilter.vue";
import ApplicationDataTable from "./ApplicationDataTable.vue";

import {useRoute} from "vue-router";
import {useAdministrationStore} from "../../../stores/administration.js";
import {useApplicationStore} from "../../../stores/application.js";

// Utilisation des stores Pinia
const applicationStore = useApplicationStore();
const administrationStore = useAdministrationStore();

const route = useRoute();

// Calculer les colonnes sélectionnées en fonction de la route actuelle
const selectedColumns = computed(() => {
  switch (route.name) {
    case 'Pages':
      return administrationStore.selectedPageKeys;
    case 'Workflows':
      return administrationStore.selectedWorkflowKeys;
    case 'Variables':
      return administrationStore.selectedVariableKeys;
    case 'Composants':
      return administrationStore.selectedWwObjectKeys;
    default:
      return [];
  }
});

// Fonction pour charger les données en fonction de la route actuelle
const fetchData = () => {
  switch (route.name) {
    case 'Pages':
      applicationStore.fetchPages();
      break;
    case 'Workflows':
      applicationStore.fetchWorkflows();
      break;
    case 'Variables':
      applicationStore.fetchVariables();
      break;
    case 'Composants':
      applicationStore.fetchWwObjects();
      break;
    default:
      break;
  }
};

// Filtrer les données en fonction de la version sélectionnée
const filteredData = computed(() => {
  switch (route.name) {
    case 'Pages':
      return applicationStore.pages.filter(row => row.cache_version === applicationStore.selectedCacheVersion);
    case 'Workflows':
      return applicationStore.workflows.filter(row => row.cache_version === applicationStore.selectedCacheVersion);
    case 'Variables':
      return applicationStore.variables.filter(row => row.cache_version === applicationStore.selectedCacheVersion);
    case 'Composants':
      return applicationStore.wwobjects.filter(row => row.cache_version === applicationStore.selectedCacheVersion);
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
    <ApplicationDataTableVersionFilter/>
    <div v-if="!filteredData.length">
      No data available.
    </div>
    <div v-else>
      <ApplicationDataTable :data="filteredData" :columns="selectedColumns"/>
    </div>
</template>

<style scoped>
</style>
