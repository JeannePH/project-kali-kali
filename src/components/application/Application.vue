<script setup>
import HeaderComponent from "./ApplicationHeader.vue";
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
</script>

<template>
  <div class="application-container">
    <header-component :app-name="appNameVariable" :app-object="appObjectVariable"/>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.application-container {
  flex-grow: 1;
}
</style>