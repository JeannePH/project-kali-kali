<script setup>
import {ref, computed} from "vue";
import TheSidemenu from "./components/TheSidemenu.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import {useRoute} from "vue-router";

//Déclarer et définir des variables pour les props du header.
const appNameVariable = "OCT";

//Ajouter une référence réactive pour suivre l'état du menu latéral.
const isSidemenuOpen = ref(true);

//Ajouter une fonction pour mettre à jour isSideMenuOpen lorsqu'un événement toggle est reçu.
function handleToggle(open) {
  isSidemenuOpen.value = open;
}

// Utiliser useRoute pour obtenir le nom de la route actuelle.
const route = useRoute();


// Déclarer une constante réactive pour le nom de la route actuelle.
const currentRouteName = computed(() => route.name || '');

// Ajouter une constante pour appObjectVariable qui utilise currentRouteName
const appObjectVariable = computed(() => currentRouteName.value);


</script>

<template>
  <div :class="['app-container', { 'menu-open': isSidemenuOpen }]">
    <TheSidemenu @toggle="handleToggle"/>
    <div class="main-container">
      <header-component :app-name="appNameVariable" :app-object="appObjectVariable"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: margin-left 0.3s;
  margin-left: 50px;
  flex-grow: 1;
  padding: 20px;
  width: 100%;
}

.app-container.menu-open .main-container {
  margin-left: 240px;
}

</style>