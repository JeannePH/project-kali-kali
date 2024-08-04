<template>
  <div class="filter-container">
    <label for="version-select">Version</label>
    <select id="version-select" v-model="selectedVersion" @change="updateVersion">
      <option v-for="version in applicationVersions" :key="version" :value="version">{{ version }}</option>
    </select>
  </div>
</template>

<script setup>
import {ref, computed, watchEffect} from 'vue';
import store from '../store.js';

// Créer une référence pour la version sélectionnée
const selectedVersion = ref(store.selectedCacheVersion);

// Récupérer les versions disponibles depuis le store
const applicationVersions = computed(() => store.applicationVersions);

// Mettre à jour la version sélectionnée dans le store
const updateVersion = () => {
  store.setSelectedCacheVersion(selectedVersion.value);
};

// Réagir aux modifications de selectedCacheVersion dans le store
watchEffect(() => {
  selectedVersion.value = store.selectedCacheVersion;
});
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
}

#version-select {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
