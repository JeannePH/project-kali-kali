<script setup>
import {defineProps} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const props = defineProps({
  to: String,
  icon: String,
  pageName: String,
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
  <li class="sidemenu-item" :class="{ active: isActive() }">
    <label
        role="button"
        tabindex="0"
        @click="navigate"
        @keydown.space.prevent="navigate"
        @keydown.enter.prevent="navigate"
        aria-label="Naviguer vers {{ pageName }}"
    >
      <img
          v-if="icon"
          :src="iconSrc"
          :alt="pageName"
          class="sidemenu-item__icon"
          :class="{'rotate-90': dropdown && !dropdownOpen}"/>
      <span>{{ pageName }}</span>
    </label>
  </li>
</template>

<style scoped>
.sidemenu-item {
  display: flex;
  padding: 8px;
  height: 38px;
  margin-bottom: 1px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--txt-primary);
}

.sidemenu-item label{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 4px
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

.rotate-90 {
  transform: rotate(-90deg);
  transition: transform 0.3s ease;
}

.sidemenu-item__icon {
  max-width: 20px;
  max-height: 20px;
  align-self: center;
  transition: transform 0.3s ease;
}
</style>
