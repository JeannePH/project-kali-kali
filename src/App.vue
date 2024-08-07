<script setup>
import {ref, computed} from "vue";
import TheSidemenu from "./components/sidemenu/TheSidemenu.vue";

//Ajouter une référence réactive pour suivre l'état du menu latéral.
const isSidemenuOpen = ref(true);

//Ajouter une fonction pour mettre à jour isSideMenuOpen lorsqu'un événement toggle est reçu.
function handleToggle(open) {
  isSidemenuOpen.value = open;
}


</script>

<template>
  <div :class="['app-container', { 'menu-open': isSidemenuOpen }]">
    <TheSidemenu @toggle="handleToggle"/>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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

.app-container.menu-open .main-container {
  display: flex;
  flex-grow: 1;
  margin-left: 240px;
  max-width: calc(100vw - 240px);
}

</style>