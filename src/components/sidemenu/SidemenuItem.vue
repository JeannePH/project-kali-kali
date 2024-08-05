<script setup>
import { defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  to: String,
  icon: String,
  label: String,
  exact: Boolean,
  dropdown: Boolean,
  dropdownOpen: Boolean,
  toggleDropdown: Function
});

const route = useRoute();
const router = useRouter();

const isActive = () => {
  return props.exact ? route.path === props.to : route.path.startsWith(props.to);
};

const navigate = () => {
  if (props.dropdown && props.toggleDropdown) {
    props.toggleDropdown();
  } else {
    router.push(props.to);
  }
};

// Utilisez une fonction pour importer les icônes dynamiquement
const iconSrc = new URL(`../../assets/${props.icon}`, import.meta.url).href;
</script>

<template>
  <li class="menu-item" :class="{ active: isActive() }" @click="navigate">
    <img  v-if=icon :src=" iconSrc " alt="{{ label }}" class="menu-icon"/>
    <span>{{ label }}</span>
  </li>
</template>

<style scoped>
.menu-item {
  display: flex;
  padding: 8px;
  margin-bottom: 1px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #52525B;
  gap: 8px;
}

.menu-item.active,
.menu-item:hover {
  background-color: #E4E4E7;
  border-radius: 8px;
}

.menu-icon {
  max-width: 20px;
  max-height: 20px;
  align-self: center;
}
</style>
