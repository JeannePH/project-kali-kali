<script setup>
</script>

<template>
  <div id="nav">
    <div>
      <router-link to="/test">Page de test</router-link>
      <div>
        <router-link to="/home">Home</router-link>
        |
        <router-link to="/application">Application</router-link>
        |
        <RouterLink to="/login">Login</RouterLink>
        |
        <RouterLink to="/search">Recherche</RouterLink>
        |
        <RouterLink to="/audit">Audit</RouterLink>
        |
        <RouterLink to="/administration">Administration</RouterLink>
      </div>

      <div>
        <router-link to="/pages">Pages</router-link>
        |
        <router-link to="/workflows">Workflows</router-link>
        |
        <router-link to="/variables">Variables</router-link>
        |
        <router-link to="/composants">Composants</router-link>
        |
        <router-link to="/actions">Actions</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped>

</style>