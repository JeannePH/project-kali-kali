<script setup>

import {ref} from "vue";

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
  filesContent.value = [];
  const inputFileElement = document.querySelector('input[type="file"]');
  if (inputFileElement) {
    inputFileElement.value = '';
  }
};

</script>

<template>
  <div>
    <div class="header">
      <div class="container-space-between-align-center">
        <h2>Ajouter des fichiers</h2>
        <div class="container-icon">
          <img src="../../assets/chevron_right.svg" alt="chevron">
        </div>
      </div>
    </div>
    <div class="form-container">
      <div class="form-body">
        <h3>Télécharger un fichier JSON</h3>
        <input type="file" accept=".json" multiple @change="handleFileUpload"/>
      </div>
      <div class="form-footer">
        <button class="btn-secondary" @click="resetForm">Annuler</button>
        <button class="btn-primary" @click="addApplication">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>