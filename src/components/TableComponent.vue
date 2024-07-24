<script setup>
import store from '../store';

const props = defineProps({
  data: { type: Array, default: () => [] },
})


</script>


<template>
  <div class="container">
    <div v-if="!data.length">
      No data available.
    </div>

    <div v-else>
      <table class="pages-table">
        <thead>
        <tr>
          <th v-for="key in Object.keys(data[0])" :key="key">{{ key }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in store.pages" :key="row.id">
          <td v-for="(value, key) in row" :key="key">
            <span v-if="value">{{ value }}</span>
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


.pages-table {
  min-width: 100%;
  border-collapse: collapse;
}

.pages-table th,
.pages-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  height: 80px; /* Hauteur fixe pour chaque cellule */
  max-width: 150px; /* Largeur maximale pour gérer les débordements */
  overflow: hidden; /* Cache le texte qui dépasse */
  text-overflow: ellipsis; /* Ajoute '...' pour les textes trop longs */
  white-space: nowrap; /* Empêche le retour à la ligne */
}

.pages-table th {
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