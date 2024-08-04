<script setup>
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
</script>

<template>
  <div class="upload-container">
    <h3>Télécharger un fichier JSON</h3>
    <input type="file" accept=".json" @change="handleFileUpload" />
  </div>
</template>

<style scoped>
.upload-container {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}

.upload-container h3 {
  margin: 0 0 10px 0;
}

.upload-container input[type="file"] {
  width: 100%;
  padding: 10px;
}
</style>