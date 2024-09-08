<script setup>
import {ref} from 'vue';
import {processFiles} from "../../api/extractor.js";
import {useMessageStore} from "../../stores/messages.js";

const appName = ref('');
const filesContent = ref([]);

const formErrors = ref({
  appName: '',
  file: ''
});

const messageStore = useMessageStore();

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
  messageStore.setSuccessMessage("Ceci est un message de succès !");
  messageStore.setErrorMessage("Ceci est un message d'erreur !");
  // Réinitialiser les erreurs du formulaire
  formErrors.value.appName = '';
  formErrors.value.file = '';
  // Réinitialiser les messages globaux du store
  messageStore.clearMessages();
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
    messageStore.clearMessages();

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
    messageStore.setSuccessMessage("L'application a été ajoutée avec succès !");
  } catch (error) {
    console.log('❌ Erreur lors de l\'ajout de l\'application :', error);
    messageStore.setErrorMessage('Erreur lors de l\'ajout de l\'application : ${error.message}');
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
          <input id="appName" type="text" placeholder="Le nom de l'application" v-model="appName"/>
        </div>
        <!-- Erreur pour le champ nom -->
        <div v-if="formErrors.appName" class="error-message">
          {{ formErrors.appName }}
        </div>
        <div class="container-upload">
          <label for="fileUpload">Ajouter les fichiers</label>
          <input id="fileUpload" type="file" accept=".json" multiple @change="handleFileUpload"/>
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

      <div v-if="messageStore.errorMessage" class="error-message">
        {{ messageStore.errorMessage }}
      </div>
      <div v-if="messageStore.successMessage" class="success-message">
        {{ messageStore.successMessage }}
      </div>

    </div>
  </form>
</template>

<style scoped>
</style>
