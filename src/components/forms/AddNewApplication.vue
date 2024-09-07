<script setup>
import {ref} from 'vue';
import {processFiles} from "../../api/extractor.js";
import store from "../../store.js";

const appName = ref('');
const filesContent = ref([]);

const formErrors = ref({
  appName: '',
  file: ''
});

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
      formErrors.value.file = `${file ? file.name : 'Le fichier'} n'est pas un fichier JSON valide.`;
    }
  }
};

const resetForm = () => {
  // Réinitialiser les champs de saisie
  appName.value = '';
  filesContent.value = [];
  // Réinitialiser les erreurs du formulaire
  formErrors.value.appName = '';
  formErrors.value.file = '';
  // Réinitialiser les messages globaux du store
  store.clearMessages();
  // Réinitialiser l'élément de fichier
  const inputFileElement = document.querySelector('input[type="file"]');
  if (inputFileElement) {
    inputFileElement.value = '';
  }
};

const addApplication = async () => {
  try {
    // Réinitialiser les erreurs avant soumission
    formErrors.value.appName = '';
    formErrors.value.file = '';
    store.clearMessages();

    console.log(`Nom: ${appName.value}`);

    if (!appName.value) {
      formErrors.value.appName = "Le nom de l'application est requis.";
    }
    if (filesContent.value.length === 0) {
      formErrors.value.file = "Vous devez télécharger au moins un fichier JSON.";
    }

    // Arrêter la soumission si des erreurs existent
    if (formErrors.value.appName || formErrors.value.file) return;

    await processFiles(filesContent.value, appName.value);
    resetForm();

    // Si tout se passe bien
    store.setSuccessMessage = "L'application a été ajoutée avec succès !";
    resetForm(); // Réinitialiser le formulaire après l'ajout
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout de l\'application :', error);
    store.setErrorMessage = `Erreur lors de l'ajout de l'application : ${error.message}`;
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

  <!-- Formulaire -->
  <form @submit.prevent="addApplication">
    <div class="form-container">
      <div class="form-body">
        <div class="container-input">
          <label for="appName">Nom</label>
          <input type="text" id="appName" placeholder="Le nom de l'application" v-model="appName"/>
        </div>
        <!-- Erreur pour le champ nom -->
        <div v-if="formErrors.appName" class="error-message">
          {{ formErrors.appName }}
        </div>
        <div>
          <input type="file" accept=".json" multiple @change="handleFileUpload"/>
        </div>

        <!-- Erreur pour le fichier -->
        <div v-if="formErrors.file" class="error-message">
          {{ formErrors.file }}
        </div>
      </div>

      <div class="form-footer">
        <button type="button" class="btn-secondary" @click="resetForm">Annuler</button>
        <button type="submit" class="btn-primary submit-button">Ajouter</button>
      </div>

      <div v-if="store.errorMessage" class="error-message">
        {{ store.errorMessage }}
      </div>
      <div v-if="store.successMessage" class="success-message">
        {{ store.successMessage }}
      </div>

    </div>
  </form>
</template>

<style scoped>
</style>
