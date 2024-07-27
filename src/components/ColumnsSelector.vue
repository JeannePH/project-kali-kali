<script setup>
import {onMounted, ref, watch} from 'vue';
import store from "../store.js";

const props = defineProps({
  columns: {type: Array, required: true}, // Les clés de colonnes
  title: {type: String, required: true}, // Le titre pour chaque section
  type: { type: String, required: true } // Type de données (pages, workflows, etc.)
});

// Initialiser selectedColumns avec les clés sélectionnées dans le store
const selectedColumns = ref([]);

onMounted(() => {
  // Charger les sélections actuelles depuis le store
  selectedColumns.value = [...store[store.typeToProperty[props.type]]];
  console.log(`Initial selected columns for ${props.type}:`, selectedColumns.value);

});

// Observer les changements dans selectedColumns et les propager au store
watch(selectedColumns, (newColumns) => {
  store.setSelectedColumns(props.type, newColumns);
});


</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-for="column in columns" :key="column">
      <label>
        <input type="checkbox" :value="column" v-model="selectedColumns"/>
        {{ column }}
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>