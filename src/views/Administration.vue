<script setup>
import store from '../store';
import { onMounted } from 'vue';
import ColumnsSelector from '../components/ColumnsSelector.vue';

onMounted(async () => {
  // Assurez-vous que les clés de colonnes sont chargées avant de rendre les composants
  await store.fetchAllSelectedApplicationData();
});
</script>

<template>
  <div class="container">
    <ColumnsSelector :title="'Pages'" :columns="store.pageKeys" />
    <ColumnsSelector :title="'Variables'" :columns="store.variableKeys" />
    <ColumnsSelector :title="'Workflows'" :columns="store.workflowKeys" />
    <ColumnsSelector :title="'Composants'" :columns="store.wwObjectKeys" />
    <ColumnsSelector :title="'Actions'" :columns="store.actionKeys" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
</style>