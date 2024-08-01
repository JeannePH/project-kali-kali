<script setup>
import {ref} from 'vue';

const emits = defineEmits(['toggle']);

const sidemenuOpen = ref(true);
const userName = ref('jeanne@ezacae.com');

function toggleSideMenu() {
  sidemenuOpen.value = !sidemenuOpen.value;
  emits('toggle', sidemenuOpen.value);
}

function logout() {
  alert('Logged out!');
}
</script>

<template>
  <div :class="['menu', { open: sidemenuOpen }]">
    <div class="close-icon-container">
      <div class="close-icon" @click="toggleSideMenu">
        <img src="../assets/chevron_double_right.svg" alt="close-menu-icon">
      </div>
    </div>
    <div class="content" v-if="sidemenuOpen">
      <div class="top-section">
        <div class="app-logo-container">
          <div class="app-logo">
            <img src="../assets/logo_kali.png" alt="Logo">
          </div>
        </div>
        <div class="menu-container">
          <ul class="menu-list">
            <li class="menu-item">
              <router-link to="/application" class="router-link">Applications</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/administration" class="router-link">Administration</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/audit" class="router-link">Audit</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/search" class="router-link">Recherche</router-link>
            </li>
            <li class="menu-item non-clickable">Data ▼</li>
            <ul class="submenu">
              <li class="menu-item"><router-link to="/pages" class="router-link">Pages</router-link></li>
              <li class="menu-item"><router-link to="/workflows" class="router-link">Workflows</router-link></li>
              <li class="menu-item"><router-link to="/variables" class="router-link">Variables</router-link></li>
              <li class="menu-item"><router-link to="/composants" class="router-link">Composants</router-link></li>
              <li class="menu-item"><router-link to="/actions" class="router-link">Actions</router-link></li>
            </ul>
          </ul>
        </div>
      </div>
      <div class="profile-container">
        <span class="name">{{ userName }}</span>
        <span class="logout-button" @click="logout">
          Log Out
        </span>
      </div>
    </div>
  </div>
</template>


<style scoped>

.menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid #ddd;
  transition: width 0.3s;
  overflow: hidden;
  z-index: 1000;
  width: 50px;
}

.menu.open {
  width: 240px;
}

.close-icon-container {
  cursor: pointer;
  padding: 4px;
  font-size: 24px;
  text-align: right;
}

.close-icon {
  cursor: pointer;
  padding: 8px;
  font-size: 24px;
  text-align: right;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 72px);
}

.top-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.app-logo-container {
  display: flex;
  flex-direction: column;
  max-width: 240px;
  max-height: 150px;
  padding-inline: 8px;
  text-align: center;
}

.app-logo img {
  max-width: 100%;
  max-height: 120px;
  height: auto;
  display: block;
  margin: 4px auto;
}

.menu-container {
  display: flex;
  flex-direction: column;
  padding-inline: 16px;
  flex-grow: 1;
}

.menu-list {
  width: 100%;
  padding: 0;
}

.menu-item a {
  color: #2c3e50;  /* Adapted to dark color for white background */
  opacity: 0.7;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.menu-item {
  padding: 8px;
  display: flex;
  align-items: center;
}

.menu-item a.kali-active-link,
.menu-item a:hover {
  opacity: 1;
  color: #2c3e50;
}

.menu-item.non-clickable {
  background-color: transparent;
  color: #BBBAB2;
  cursor: default;
  font-style: italic;
}

.submenu {
  padding-left: 24px;
  list-style-type: none;
  position: relative;
}

.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 8px;
  text-align: center;
}

.logout-button {
  margin-top: 8px;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  color: #00bcd4;
  font-weight: bold;
}

.logout-button:hover {
  text-decoration: none;
}
</style>