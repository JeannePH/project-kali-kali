<script setup>
import {onMounted, computed} from 'vue';
import DoughnutComponent from './DoughnutComponent.vue';
import {useApplicationStore} from "../../../stores/application.js";

const applicationStore = useApplicationStore();

onMounted(async () => {
  await store.getApplicationAudits();
  console.log(applicationStore.applicationAudits);
});

const audits = computed(() => applicationStore.applicationAudits);
const labels = {
  null_error_action_percentage: 'Pourcentage de workflows n\'ayant pas de gestion des cas d\'erreur',
  workflow_nameless_percentage: 'Pourcentage de workflows n\'ayant pas de nom',
  variable_no_value_percentage: 'Pourcentage de variables n\'ayant pas de valeur par défaut',
  ww_object_nameless_percentage: 'Pourcentage de composants n\'ayant pas de nom'
};
</script>

<template>
  <div class="container-row custom-scrollbar">
    <div class="container-label">
      <p v-for="(pageName, key) in labels" :key="key" class="label">{{ pageName }}</p>
    </div>
    <div class="container-columns">
      <div v-for="audit in audits" :key="audit.cache_version" class="column-version">
        <div class="column-version-header">
          <h3>Version {{ audit.cache_version }}</h3>
        </div>
        <div class="column-version-doughnuts">
          <div class="doughnut-item" v-for="(pageName, key) in labels" :key="key">
            <DoughnutComponent :label="label" :value="audit[key]"/>
            <p>{{ audit[key] }}%</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container-label {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-right: 24px;
  max-width: 280px;
}

.label {
  font-size: 1em;
  padding-top: 24px;
  margin-bottom: 38px;
}

.container-columns {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.column-version {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.column-version-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.column-version-doughnuts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.doughnut-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
