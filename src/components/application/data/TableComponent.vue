<script setup>
import store from "../../../store.js";
import { computed, watchEffect } from "vue";

const props = defineProps({
  data: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] } // Colonnes sélectionnées
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
  <div class="container">
    <div v-if="!filteredData.length">
      No data available.
    </div>

    <div v-else>
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
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 32px;
  min-width: 100%;
}

.data-table {
  min-width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  height: 80px; /* Hauteur fixe pour chaque cellule */
  max-width: 150px; /* Largeur maximale pour gérer les débordements */
  overflow: hidden; /* Cache le texte qui dépasse */
  text-overflow: ellipsis; /* Ajoute '...' pour les textes trop longs */
  white-space: nowrap; /* Empêche le retour à la ligne */
}

.data-table th {
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
