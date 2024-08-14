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
  <li class="sidemenu-item" :class="{ active: isActive() }" @click="navigate">
    <img  v-if=icon :src=" iconSrc " alt="{{ label }}" class="sidemenu-item__icon"/>
    <span>{{ label }}</span>
  </li>
</template>

<style scoped>
.sidemenu-item {
  display: flex;
  padding: 8px;
  margin-bottom: 1px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--txt-primary);
  gap: 8px;
}

.sidemenu-item.active,
.sidemenu-item:hover {
  background-color: var(--bg-primary);
  border-radius: 8px;
}

.sidemenu-item__icon {
  max-width: 20px;
  max-height: 20px;
  align-self: center;
}
</style>
