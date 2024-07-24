<script setup>
import {computed} from 'vue';
import store from '../store';

const applications = computed(() => store.applications);

</script>

<template>
  <table class="applications-table">
    <thead>
    <tr>
      <th v-for="(value, key) in applications[0]" :key="key">{{ key }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="application in applications" :key="application.id">
      <td v-for="(value, key) in application" :key="key">
        <span v-if="value">{{ value }}</span>
        <span v-else class="dot red-dot"></span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.applications-table {
  min-width: 100%;
  border-collapse: collapse;
}

.applications-table th,
.applications-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.applications-table th {
  background-color: #f2f2f2;
}

.dot {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
}

.red-dot {
  background-color: red;
}
</style>