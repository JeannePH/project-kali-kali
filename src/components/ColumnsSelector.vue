<script setup>
import {ref} from 'vue';

const props = defineProps({
  columns: {type: Array, required: true}, // Les clés de colonnes
  title: {type: String, required: true} // Le titre pour chaque section
});

const selectedColumns = ref([]);

const savePreferences = () => {
  console.log('Colonnes sélectionnées:', selectedColumns.value);
  // Ici, vous pouvez stocker les préférences ou les envoyer à un serveur
};
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
    <button @click="savePreferences">Enregistrer les préférences</button>
  </div>
</template>

<style scoped>

</style>