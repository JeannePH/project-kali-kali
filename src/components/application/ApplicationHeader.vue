<script setup>

//Déclarer et définir des variables pour les props du header.
import store from "../../store.js";
import {computed} from "vue";
import {useRoute} from "vue-router";

// Utiliser useRoute pour obtenir le nom de la route actuelle.
const route = useRoute();


// Déclarer une constante réactive pour le nom de la route actuelle.
const currentRouteName = computed(() => route.name || '');

const appNameVariable = store.selectedApplicationName || "OCT";

// Ajouter une constante pour appObjectVariable qui utilise currentRouteName
const appObjectVariable = computed(() => currentRouteName.value);

const props = defineProps(['appName', 'appObject']);
</script>

<template>
  <div class="header">
    <div class="header-left">
      <h1 class="app-name">{{ props.appName }}</h1>
      <div class="chevron-container">
        <img src="../../assets/chevron_right.svg" alt="chevron">
      </div>
      <h2 class="app-object">{{ props.appObject }}</h2>
    </div>
    <div class="header-right">
      <router-link to="/test" class="router-link">Test</router-link>
    </div>
  </div>
</template>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px 0;
  width: 100%;
}

.app-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a3e83; /* Blue color */
  margin: 0;
}

.chevron-container {
  display: flex;
  align-items: center;
  margin: 0 10px;

}

.chevron-container img {
  width: 20px;
  height: 20px;
}

.app-object {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a3e83; /* Blue color */
  margin: 0;
}

.header-right {
  display: flex;
  justify-content: flex-end;
}

.header-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>