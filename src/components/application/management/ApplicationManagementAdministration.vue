<script setup>
import store from '../../../store.js';
import { onMounted } from 'vue';
import ColumnsSelector from './ApplicationManagementAdministrationColumn.vue';

onMounted(async () => {
  // Assurez-vous que les clés de colonnes sont chargées avant de rendre les composants
  await store.fetchAllSelectedApplicationData();
});
</script>

<template>
  <div class="container-sans-wrap-align-top custom-scrollbar">
    <ColumnsSelector :title="'Pages'" :columns="store.pageKeys"  type="pages"/>
    <ColumnsSelector :title="'Variables'" :columns="store.variableKeys"  type="variables"/>
    <ColumnsSelector :title="'Workflows'" :columns="store.workflowKeys"  type="workflows"/>
    <ColumnsSelector :title="'Composants'" :columns="store.wwObjectKeys"  type="objects"/>
    <ColumnsSelector :title="'Actions'" :columns="store.actionKeys"  type="actions"/>
  </div>
</template>

<style scoped>

</style>