<script setup>
import HeaderComponent from "./TheApplicationHeader.vue";
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useApplicationStore} from "../../stores/application.js";

// Utilisation du store Pinia pour accéder aux données de l'application
const applicationStore = useApplicationStore();

// Utiliser useRoute pour obtenir le nom de la route actuelle.
const route = useRoute();

// Déclarer une constante réactive pour le nom de la route actuelle.
const currentRouteName = computed(() => route.name || '');


// Utiliser Pinia pour obtenir le nom de l'application sélectionnée ou définir une valeur par défaut
const appNameVariable = computed(() => applicationStore.selectedApplicationName || "OCT");

// Ajouter une constante pour appObjectVariable qui utilise currentRouteName
const appObjectVariable = computed(() => currentRouteName.value);
</script>

<template>
  <header-component :app-name="appNameVariable" :app-object="appObjectVariable"/>
  <router-view></router-view>
</template>

<style scoped>
</style>