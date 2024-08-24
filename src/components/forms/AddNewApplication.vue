<script setup>
import {ref} from 'vue';
import {processFiles} from "../../api/extractor.js";

const name = ref('');
const wewebid = ref('');

const filesContent = ref([]);

const handleFileUpload = (event) => {
  const files = event.target.files;
  for (const file of files) {
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        filesContent.value.push({
          name: file.name,
          content: JSON.parse(content)
        });
        console.log("Fichier JSON téléchargé :", content);
      };
      reader.readAsText(file);
    } else {
      console.error("Veuillez télécharger un fichier JSON valide.");
    }
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

const addApplication = async () => {
  try {
    console.log(`Nom: ${name.value}, weweb id: ${wewebid.value}`);
    if (!name.value || !wewebid.value || filesContent.value.length === 0) {
      console.error("Veuillez remplir tous les champs et télécharger au moins un fichier JSON.");
      return;
    }
    await processFiles(filesContent.value, name.value, wewebid.value);
    resetForm();
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'application :', error);
  }
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
