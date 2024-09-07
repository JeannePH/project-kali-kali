<script setup>
import {ref} from 'vue';
import store from "../store.js";
import router from "../router/index.js";

// Références réactives pour l'email, le mot de passe, et les messages d'erreur
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  console.log("Tentative de connexion avec email:", email.value);
  try {
    await store.login(email.value, password.value);
    if (!store.errorMessage) {
      console.log("✅ Connexion réussie, redirection vers /applications");
      await router.push('/applications');
    }
  } catch (error) {
    console.log("❌ Erreur dans handleLogin:", error.message);
  }
};
</script>

<template>
  <div class="container-column">
    <div class="app-logo-container">
      <div class="app-logo">
        <img src="../assets/logo_kali.png" alt="Logo">
      </div>
    </div>
    <div class="login-form-container">
      <form @submit.prevent="handleLogin" class="form-body">
        <div class="container-input">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required/>
        </div>
        <div class="container-input">
          <label for="password">Mot de passe:</label>
          <input type="password" v-model="password" required/>
        </div>
        <div class="login-form-footer">
          <button type="submit" class="btn-primary">Se connecter</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>



.login-form-container {
  border-radius: 8px;
  max-width: 400px;
  padding: 24px 36px;
  border: 1px solid var(--border-color-primary);
  gap: 24px;
}

.login-form-footer {
  display: flex;
  justify-content: center;
  padding-top: 10px;
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
</style>
