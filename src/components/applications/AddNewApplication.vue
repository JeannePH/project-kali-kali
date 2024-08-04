<script setup>
import { ref } from 'vue';

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
  <div class="form-container">
    <div class="form-header">
      <h3>Ajouter une application</h3>
    </div>
    <div class="form-body">
      <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" id="name" placeholder="Short answer" v-model="name" />
      </div>
      <div class="form-group">
        <label for="wewebid">weweb id</label>
        <input type="text" id="wewebid" placeholder="Short answer" v-model="wewebid" />
      </div>
    </div>
    <div class="form-footer">
      <button class="cancel-btn" @click="resetForm">Annuler</button>
      <button class="submit-btn" @click="addApplication">Ajouter</button>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

.form-header h3 {
  margin: 0;
}

.form-body {
  margin: 20px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e5e5;
  padding-top: 10px;
}

.cancel-btn {
  background: none;
  border: none;
  color: #1e5ab6;
  cursor: pointer;
  margin-right: 10px;
}

.submit-btn {
  background-color: #1e5ab6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #164a8a;
}
</style>
