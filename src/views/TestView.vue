<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import TheNavigation from "../components/TheNavigation.vue";
import store from "../store.js";

const appNameVariable = "OCT";
const appObjectVariable = "Pages";
</script>

<template>
  <div>
    <TheNavigation/>
    <TableComponent/>
    {{ store.applications }}
    <div class="card-container">
      <div class="card" v-for="application in store.applications" :id="application.id" :key="application.id">
        <span>{{ application.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>