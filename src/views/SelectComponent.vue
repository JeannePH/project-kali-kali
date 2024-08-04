<script setup>
import { ref, watch } from 'vue';
import store from '../store.js';

const versions = store.applicationVersions;
const selectedVersion = ref(store.selectedCacheVersion);

watch(selectedVersion, (newValue) => {
  store.setSelectedCacheVersion(newValue);
});
</script>

<template>
  <div>
    <label for="version-select">Version:</label>
    <select id="version-select" v-model="selectedVersion">
      <option v-for="version in versions" :key="version.cache_version" :value="version.cache_version">
        {{ version.cache_version }}
      </option>
    </select>
  </div>
</template>

<style scoped>

.custom-select select {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none; /* Supprime le style par défaut de la flèche */
  background: white url('data:image/svg+xml;utf8,<svg fill="%23333" height="16px" viewBox="0 0 24 24" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5H7z"/></svg>') no-repeat right 10px center;
}

.custom-select select:focus {
  border-color: #007bff; /* Couleur de la bordure au focus */
  outline: none;
}
</style>