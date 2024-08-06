<script setup>
import {ref} from 'vue';
import TheAddApplicationButton from "../TheAddApplicationButton.vue";

const name = ref('');
const wewebid = ref('');

const resetForm = () => {
  name.value = '';
  wewebid.value = '';
};

const addApplication = () => {
  // Logique pour ajouter une application (à implémenter selon votre logique)
  console.log(`Nom: ${name.value}, weweb id: ${wewebid.value}`);
  resetForm();
};
</script>

<template>
  <div class="header">
    <div class="container-space-between-align-center">
      <h2>Ajouter une application</h2>
      <div class="container-icon">
        <img src="../../assets/chevron_right.svg" alt="chevron">
      </div>
    </div>
  </div>

  <div class="form-container">
    <div class="form-body">
      <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" id="name" placeholder="Short answer" v-model="name"/>
      </div>
      <div class="form-group">
        <label for="wewebid">weweb id</label>
        <input type="text" id="wewebid" placeholder="Short answer" v-model="wewebid"/>
      </div>
    </div>
    <div class="form-footer">
      <button class="btn-secondary" @click="resetForm">Annuler</button>
      <button class="btn-primary" @click="addApplication">Ajouter</button>
    </div>
  </div>
</template>

<style scoped>
</style>
