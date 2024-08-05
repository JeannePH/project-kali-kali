<script setup>
import TheAddApplicationButton from "../TheAddApplicationButton.vue";

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
  <div class="header">
    <div class="header-left">
      <h1 class="app-name">Ajouter des fichiers</h1>
      <div class="chevron-container">
        <img src="../../assets/chevron_right.svg" alt="chevron">
      </div>
    </div>
  </div>
  <div class="upload-container">
    <h3>Télécharger un fichier JSON</h3>
    <input type="file" accept=".json" @change="handleFileUpload" />
  </div>
</template>

<style scoped>


.header {
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px 0;
  width: 100%;
}

.app-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a3e83; /* Blue color */
  margin: 0;
}

.chevron-container {
  display: flex;
  align-items: center;
  margin: 0 10px;

}

.chevron-container img {
  width: 20px;
  height: 20px;
}

.header-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.upload-container {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 70px auto;
}

.upload-container h3 {
  margin: 0 0 10px 0;
}

.upload-container input[type="file"] {
  width: 100%;
  padding: 10px;
}




</style>