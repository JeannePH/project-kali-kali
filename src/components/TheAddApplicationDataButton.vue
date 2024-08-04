<script setup>
</script>

<template>
  <div>
    <router-link to="/add-application-data" class="add-btn">
      Ajouter des fichiers
    </router-link>
  </div>
</template>

<style scoped>
.add-btn {
  background-color: #1e5ab6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.add-btn:hover {
  background-color: #164a8a;
}
</style>