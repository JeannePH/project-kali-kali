<script setup>
import store from '../../../store.js';
import TableComponent from "./TableComponent.vue";
import {computed, onMounted} from "vue";
import SelectComponent from "../../../views/SelectComponent.vue";


onMounted(() => {
  // Calcul des colonnes sélectionnées pour les variables
  store.fetchVariables();
})

const selectedColumns = computed(()=> store.selectedVariableKeys);


</script>

<template>
  <div class="container">
    <div v-if="!store.variables.length">
      No data available.
    </div>
    <div v-else>
      <SelectComponent :options="store.applicationVersions" :modelValue="store.applicationVersions[0].cache_version"/>
      <TableComponent :data="store.variables" :columns="selectedColumns"/>
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