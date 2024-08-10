<script setup>
import {ref} from "vue";
import TheSidemenu from "../../components/sidemenu/TheSidemenu.vue";

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
  width: 100%;
  overflow: hidden;
  background-color: deeppink;

}


.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: margin-left 0.3s;
  flex-grow: 1;
  padding: 20px;
  background-color: bisque;
  height: 100vh
}

.app-container.menu-open .main-container {
  display: flex;
  margin-left: 240px;
  max-width: calc(100vw - 240px);
}

.app-container:not(.menu-open) .main-container {
  margin-left: 50px; /* Quand le menu est fermé, déplacez le contenu de 50px */
  width: calc(100vw - 50px); /* Ajuste la largeur en conséquence */
}

</style>