<script setup>
import store from '../store';
import TableComponent from "../components/TableComponent.vue";

store.fetchPages();

</script>

<template>
  <div class="container">
    <div v-if="!store.pages.length">
      No data available.
    </div>
    <div v-else>
      <TableComponent :data="store.pages"/>
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