<script setup>
import {useRouter} from "vue-router";
import ApplicationsHeader from "./TheApplicationsHeader.vue";
import {useAllApplicationsStore} from "../../stores/allApplications.js";
import {useApplicationStore} from "../../stores/application.js";

// Accéder aux stores
const allApplicationsStore = useAllApplicationsStore();
const applicationStore = useApplicationStore();
const router = useRouter();

// Charger toutes les applications au chargement du composant
allApplicationsStore.fetchApplications();

// Fonction pour sélectionner une application et charger toutes les données associées
async function selectApplication(applicationId) {
  applicationStore.setSelectedApplicationId(applicationId);
  await applicationStore.fetchAllSelectedApplicationData();
  router.push({ name: 'Pages' });
}
</script>

<template>
  <ApplicationsHeader/>
  <div class="container" v-if="!allApplicationsStore.applications.length">Il n'y a pas d'application dans la table application</div>
  <div class="container" v-else>
    <button
        v-for="application in allApplicationsStore.applications"
        :id="`application-${application.id}`"
        :key="application.id"
        @click="selectApplication(application.id)"
        @keydown.enter.prevent="selectApplication(application.id)"
        @keydown.space.prevent="selectApplication(application.id)"
        class="card"
        type="button"
        role="button"
        aria-label="Sélectionner l'application {{ application.name }}"
    >
      <span>{{ application.name }}</span>
    </button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  border: 1px solid var(--border-color-black);
  border-radius: 25px;
  box-shadow: 0 4px 8px var(--border-color-primary);
  font-size: 24px;
  color: var(--txt-black);
  padding: 16px;
  cursor: pointer;
}

.card:focus,
.card:hover {
  outline: 1px solid var(--border-color-black);
  background-color: var(--bg-primary-light);
}

.card span {
  font-weight: bold;
  text-transform: uppercase;
}
</style>