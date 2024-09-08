<script setup>
import store from "../../store.js";
import {useRouter} from "vue-router";
import ApplicationsHeader from "./TheApplicationsHeader.vue";

store.fetchApplications();
const router = useRouter();

async function selectApplication(applicationId) {
  store.setSelectedApplicationId(applicationId);
  await store.fetchAllSelectedApplicationData();
  router.push({name: 'Pages'});
}

</script>

<template>
  <ApplicationsHeader/>

  <!-- Message s'il n'y a pas d'applications -->
  <div class="container" v-if="!store.applications.length">Il n'y a pas d'application dans la table application</div>

  <!-- Liste d'applications -->
  <div class="container" v-else>
    <button
        v-for="application in store.applications"
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
  outline: 2px solid var(--border-color-black);
  background-color: var(--bg-primary-light);
}

.card span {
  font-weight: bold;
  text-transform: uppercase;
}
</style>

