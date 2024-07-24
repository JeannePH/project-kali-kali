<script setup>
import TableComponent from "../components/TableComponent.vue";
import store from "../store";

</script>

<template>
  <div class="container">
    <TableComponent/>
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