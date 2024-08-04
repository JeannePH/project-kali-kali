<script setup>
import HeaderComponent from "./ApplicationHeader.vue";
</script>

<template>
  <header-component :app-name="appNameVariable" :app-object="appObjectVariable"/>
  <router-view></router-view>
</template>

<style scoped>
</style>