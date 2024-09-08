<script setup>
import {computed, ref, watch} from 'vue';
import {useApplicationStore} from "../../../stores/application.js";

// Utiliser le store Pinia pour accéder à l'état de l'application
const applicationStore = useApplicationStore();

// Obtenir les versions de l'application depuis le store Pinia
const versions = computed(() => applicationStore.applicationVersions);

// Initialiser selectedVersion avec la version sélectionnée actuelle du store
const selectedVersion = ref(applicationStore.selectedCacheVersion);

// Observer les changements de selectedVersion et les propager au store Pinia
watch(selectedVersion, (newValue) => {
  applicationStore.setSelectedCacheVersion(newValue);
});
</script>

<template>
  <div class="container-filter">
    <label for="version-select">Version </label>
    <select id="version-select" v-model="selectedVersion" class="custom-select">
      <option v-for="version in versions" :key="version.cache_version" :value="version.cache_version">
        {{ version.cache_version }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.container-filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
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