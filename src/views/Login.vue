<script setup>
import {ref} from 'vue';
import store from "../store.js";
import router from "../router/index.js";

// Références réactives pour l'email, le mot de passe, et les messages d'erreur
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Fonction pour gérer la connexion
const handleLogin = async () => {
  console.log("Tentative de connexion avec email:", email.value);
  try {
    // Appelez l'action de login du store
    await store.login(email.value, password.value);

    // Vérifiez s'il n'y a pas d'erreur et redirigez l'utilisateur
    if (!store.errorMessage) {
      console.log("Connexion réussie, redirection vers /applications");
      await router.push('/applications');
    }
  } catch (error) {
    // Si une erreur se produit, affichez-la
    console.error("Erreur dans handleLogin:", error.message);
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="form-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin" class="form-body">
      <div class="container-input">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required/>
      </div>
      <div class="container-input">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required/>
      </div>
      <div class="form-footer">
        <button type="submit" class="btn-primary">Login</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
</style>
