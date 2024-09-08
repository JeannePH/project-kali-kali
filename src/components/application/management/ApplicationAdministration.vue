<script setup>
import { onMounted } from 'vue';
import ColumnsSelector from './ApplicationAdministrationColumn.vue';
import {useApplicationStore} from "../../../stores/application.js";
import {useAdministrationStore} from "../../../stores/administration.js";

const applicationStore = useApplicationStore();
const administrationStore = useAdministrationStore();

onMounted(async () => {
  await applicationStore.fetchAllSelectedApplicationData();
  administrationStore.loadSelectedColumns();
});
</script>

<template>
  <div class="container-sans-wrap-align-top custom-scrollbar">
    <ColumnsSelector :title="'Pages'" :columns="administrationStore.pageKeys"  type="pages"/>
    <ColumnsSelector :title="'Variables'" :columns="administrationStore.variableKeys"  type="variables"/>
    <ColumnsSelector :title="'Workflows'" :columns="administrationStore.workflowKeys"  type="workflows"/>
    <ColumnsSelector :title="'Composants'" :columns="administrationStore.wwObjectKeys"  type="objects"/>
  </div>
</template>

<style scoped>
</style>