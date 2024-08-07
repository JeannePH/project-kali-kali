<script setup>
import {ref} from 'vue';

const name = ref('');
const wewebid = ref('');

const filesContent = ref([]);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      console.log("Fichier JSON téléchargé :", content);
      // Vous pouvez ajouter la logique de traitement du fichier ici
    };
    reader.readAsText(file);
  } else {
    console.error("Veuillez télécharger un fichier JSON valide.");
  }
};

const resetForm = () => {
  name.value = '';
  wewebid.value = '';
  filesContent.value = [];
  const inputFileElement = document.querySelector('input[type="file"]');
  if (inputFileElement) {
    inputFileElement.value = '';
  }
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
      <div class="container-input">
        <label for="name">Nom</label>
        <input type="text" id="name" placeholder="Le nom de l'application" v-model="name"/>
      </div>
      <div class="container-input">
        <label for="wewebid">Weweb Id</label>
        <input type="text" id="wewebid" placeholder="78" v-model="wewebid"/>
      </div>
      <div>
        <input type="file" accept=".json" multiple @change="handleFileUpload"/>
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
