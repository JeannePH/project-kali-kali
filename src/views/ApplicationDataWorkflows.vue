<script setup>
import store from '../store.js';
import TableComponent from "../components/application/data/TableComponent.vue";
import {computed, onMounted} from "vue";

onMounted(() => {
  store.fetchWorkflows();
})


// Calcul des colonnes sélectionnées pour les workflows
const selectedColumns = computed(() => store.selectedWorkflowKeys);

</script>

<template>
  <div class="container">
    <div v-if="!store.workflows.length">
      No data available.
    </div>
    <div v-else>
      <TableComponent :data="store.workflows" :columns="selectedColumns"/>
    </div>
  </div>
</template>

<style scoped>

</style>