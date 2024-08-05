<script setup>
import {ref, watch} from 'vue';
import store from '../../../store.js';

const versions = store.applicationVersions;
const selectedVersion = ref(store.selectedCacheVersion);

watch(selectedVersion, (newValue) => {
  store.setSelectedCacheVersion(newValue);
});
</script>

<template>
  <div class="filter-container">
    <label for="version-select">Version </label>
    <select id="version-select" v-model="selectedVersion" class="custom-select">
      <option v-for="version in versions" :key="version.cache_version" :value="version.cache_version">
        {{ version.cache_version }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

label {
  font-size: 16px;
}

#version-select {
  min-width: 70px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

#version-select:focus {
  outline: none;
}
</style>