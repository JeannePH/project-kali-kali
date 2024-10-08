<script setup>
import {computed, ref} from 'vue';
import SidemenuItem from "./SidemenuItem.vue";
import {useApplicationStore} from "../../stores/application.js";
import {useAuth} from "../../stores/auth.js";

// Utilisation des stores Pinia
const authStore = useAuth();
const applicationStore = useApplicationStore();

// TOGGLE SIDEMENU
const emits = defineEmits(['toggle']);

const sidemenuOpen = ref(true);

function toggleSideMenu() {
  sidemenuOpen.value = !sidemenuOpen.value;
  console.log("sidemenuOpen:", sidemenuOpen.value);
  emits('toggle', sidemenuOpen.value);
}


// DROPDOWN SUBMENU
const dropdownOpen = ref(true);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
  console.log("dropdownOpen state:", dropdownOpen.value);
}

const userName = computed(() => authStore.user ? authStore.user.email : 'user@mail.com');

// LOG OUT
const handleLogout = async () => {
  await authStore.logout();
};

const isApplicationSelected = computed(() => applicationStore.selectedApplicationId !== null);

</script>

<template>
  <div :class="['menu', { open: sidemenuOpen }]">
    <div class="close-icon-container">
      <div class="close-icon" @click="toggleSideMenu">
        <img src="../../assets/chevron_double_right.svg" alt="close-menu-icon">
      </div>
    </div>
    <div class="content" v-if="sidemenuOpen">
      <div class="top-section">
        <div class="app-logo-container">
          <div class="app-logo">
            <img src="../../assets/logo_kali.png" alt="Logo">
          </div>
        </div>
        <div class="menu-container">
          <ul class="menu-list">
            <SidemenuItem to="/applications" pageName="Applications"/>
            <div v-if="isApplicationSelected">
              <SidemenuItem to="/application/administration" pageName="Administration"/>
              <SidemenuItem to="/application/audit" pageName="Audit"/>
              <SidemenuItem
                  to="#"
                  :icon="dropdownOpen ? 'mdi--chevron-down-box.svg' : 'mdi--chevron-right-box.svg'"
                  pageName="Data"
                  :dropdown="true"
                  :dropdownOpen="dropdownOpen"
                  :toggleDropdown="toggleDropdown"
              />
              <ul id="data" class="submenu" v-if="dropdownOpen">
                <SidemenuItem to="/application/pages" icon="mdi--file-outline.svg" pageName="Pages"/>
                <SidemenuItem to="/application/workflows" icon="mdi--set-left.svg" pageName="Workflows"/>
                <SidemenuItem to="/application/variables" icon="mdi--vector-combine.svg" pageName="Variables"/>
                <SidemenuItem to="/application/wwobjects" icon="mdi--database.svg" pageName="Composants"/>
              </ul>
            </div>
          </ul>
        </div>
      </div>
      <div class="profile-container">
        <div class="container-mail">
          <p class="name">{{ userName }}</p>
        </div>
        <span class="logout-button" @click="handleLogout" role="button" tabindex="0" aria-label="Se déconnecter">
          Se déconnecter
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
  background-color: var(--txt-white);
  border-right: 1px solid var(--border-color-primary);
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
  transition: opacity 0.3s;
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
  width: 100%;
  height: 125px;
  padding-inline: 8px;
  text-align: center;
}

.app-logo img {
  height: 120px;
  display: block;
  margin: 4px auto;
}

.menu-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex-grow: 1;
}

.menu-list {
  width: 100%;
  padding: 0;
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
  padding: 16px;
  gap: 8px;
  text-align: center;
}

.container-mail {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0px;
  width: 100%;
  border-bottom: 1px solid var(--border-kali);
}

.name {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-button {
  margin-top: 8px;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--txt-kali);
  font-weight: bold;
}

.logout-button:hover {
  text-decoration: none;
  color: #099AF2;
}
</style>
