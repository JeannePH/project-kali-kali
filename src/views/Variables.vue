<script setup>
import store from '../store';
import TableComponent from "../components/TableComponent.vue";
import {computed, onMounted} from "vue";


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