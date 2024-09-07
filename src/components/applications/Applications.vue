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
    <ApplicationsHeader />
    <div class="container" v-if="!store.applications.length">Il n'y a pas d'application dans la table application</div>
    <div class="container" v-else>
      <div class="card"
           v-for="application in store.applications"
           :id="application.id"
           :key="application.id"
           @click="selectApplication(application.id)"
      >
        <span>{{ application.name }}</span>
      </div>
    </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  border: 1px solid #000;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 24px;
  color: #000;
  padding: 16px;
  cursor: pointer;
}

.card span {
  font-weight: bold;
  text-transform: uppercase;
}
</style>

