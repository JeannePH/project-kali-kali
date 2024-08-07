<script setup>
import store from "../store.js";
import {computed, watchEffect} from "vue";
import TheSelectComponent from "../components/application/data/TheVersionFilterComponent.vue";

const props = defineProps({
  data: {type: Array, default: () => []},
  columns: {type: Array, default: () => []} // Colonnes sélectionnées
});

// Utiliser la version sélectionnée pour filtrer les données
const filteredData = computed(() => {
  return props.data.filter(row => row.cache_version === store.selectedCacheVersion);
});

watchEffect(() => {
  console.log(`Selected cache version: ${store.selectedCacheVersion}`);
});
</script>

<template>
  <TheSelectComponent/>
  <div class="custom-scrollbar">
    <div v-if="!filteredData.length" class="container-table custom-scrollbar">
      No data available.
    </div>
    <div v-else class="container-table custom-scrollbar">
      <table class="data-table">
        <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in filteredData" :key="row.id">
          <td v-for="column in columns" :key="column">
              <span v-if="row[column] !== null && row[column] !== undefined">
                {{ row[column] }}
              </span>
            <span v-else class="dot red-dot"></span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

.container-table {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 32px;
  min-width: 100%;
  overflow: auto;
}

.data-table {
  min-width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border-bottom: 1px solid var(--border-color-primary);
  border-right: none;
  padding: 8px 12px;
  text-align: left;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data-table th {
  background-color: var(--bg-tertiary);
}


.data-table tr {
  border-left: none; /* Enlever la bordure gauche des rangées */
  border-right: none; /* Enlever la bordure droite des rangées */
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
