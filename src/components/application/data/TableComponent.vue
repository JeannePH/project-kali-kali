<script setup>
import {computed} from "vue";

const props = defineProps({
  data: {type: Array, default: () => []},
  columns: {type: Array, default: () => []}
});

// Utiliser la version sélectionnée pour filtrer les données
const filteredData = computed(() => {
  return props.data;
});
</script>

<template>
    <div v-if="!filteredData.length">
      No data available.
    </div>
    <div v-else class="table-container custom-scrollbar">
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
</template>

<style scoped>
.table-container {
  max-height: calc(100vh - 250px); /* Définir une hauteur maximale pour activer la barre de défilement */
  max-width: 100%;
}

.data-table {
  min-width: 100%;
  border-collapse: collapse;
}

.data-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--bg-tertiary);
}

.data-table th, .data-table td {
  border-bottom: 1px solid var(--border-color-primary);
  border-right: none;
  padding: 8px 16px;
  text-align: left;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data-table tr {
  border-left: none;
  border-right: none;
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
