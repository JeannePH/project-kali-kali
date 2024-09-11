<script setup>
import {ref} from 'vue';
import router from "../router/index.js";
import {useAuth} from "../stores/auth.js";

const email = ref('');
const password = ref('');
const authStore = useAuth();

const submitLogin = async () => {
  console.log("Tentative de connexion avec email:", email.value);
  try {
    await authStore.processLogin(email.value, password.value);
    if (!authStore.errorMessage) {
      console.log("✅ Connexion réussie, redirection vers /applications");
      await router.push('/applications');
    }
  } catch (error) {
    console.log("❌ Erreur dans submitLogin:", error.message);
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
      <form @submit.prevent="submitLogin" class="form-body">
        <div class="container-input">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="email"  autocomplete="email"/>
        </div>
        <div class="container-input">
          <label for="password">Mot de passe:</label>
          <input id="password"
                 type="password"
                 v-model="password"
                 required autocomplete="current-password"/>
        </div>
        <div class="login-form-footer">
          <button type="submit" class="btn-primary">Se connecter</button>
        </div>
      </form>
      <p v-if="authStore.errorMessage" class="error">{{ authStore.errorMessage }}</p>
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

