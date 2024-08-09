<script setup>
import {ref, computed} from "vue";
import TheSidemenu from "./components/sidemenu/TheSidemenu.vue";
import store from "./store.js";

//Ajouter une référence réactive pour suivre l'état du menu latéral.
const isSidemenuOpen = ref(true);

//Ajouter une fonction pour mettre à jour isSideMenuOpen lorsqu'un événement toggle est reçu.
function handleToggle(open) {
  isSidemenuOpen.value = open;
}


const isAuthenticated = computed(() => store.user !== null);


</script>

<template>
  <div :class="['app-container', { 'menu-open': isSidemenuOpen }]">
    <!-- Afficher le sidemenu seulement si l'utilisateur est authentifié -->
    <TheSidemenu  v-if="isAuthenticated" @toggle="handleToggle"/>
    <div :class="['main-container', { 'centered': !isAuthenticated }]">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: khaki;
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
  background-color: bisque;
}

/* Center the main container when user is not authenticated */
.main-container.centered {
  justify-content: center;
  align-items: center;
  margin-left: 0px;
}

.app-container.menu-open .main-container {
  display: flex;
  flex-grow: 1;
  margin-left: 240px;
  max-width: calc(100vw - 240px);
}

</style>