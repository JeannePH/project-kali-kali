<script setup>
import store from "../store";
import {useRouter} from "vue-router";

store.fetchApplications();
const router = useRouter();

async function selectApplication(applicationId) {
  // Définir l'application sélectionnée
  store.setSelectedApplicationId(applicationId);

  // Récupérer toutes les données associées
  await store.fetchAllSelectedApplicationData();

  // Naviguer vers la page des détails des pages ou une autre vue
  router.push({name: 'Pages'});
}

</script>

<template>
  <div>
    <div class="container" v-if="!store.applications.length">Il n'y a pas d'application dans la table application</div>
    <div class="container" v-else>
      <div class="card" v-for="application in store.applications" :id="application.id" :key="application.id">
          <span @click="selectApplication(application.id)">{{ application.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 32px;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 65px;
  border: 1px solid #000;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 24px;
  margin-bottom: 16px;
  margin-right: 16px;
  color: #000;
}

.card span {
  font-weight: bold;
}
</style>