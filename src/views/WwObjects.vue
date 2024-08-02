<script setup>
import store from '../store';
import TableComponent from "../components/TableComponent.vue";
import {computed, onMounted} from "vue";

onMounted(() => {
  store.fetchWwObjects()
})

// Calcul des colonnes sélectionnées pour les wwObjects
const selectedColumns = computed(() => store.selectedWwObjectKeys);

</script>

<template>
  <div class="container">
    <div v-if="!store.wwobjects.length">
      No data available.
    </div>
    <div v-else>
      <TableComponent :data="store.wwobjects" :columns="selectedColumns"/>
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