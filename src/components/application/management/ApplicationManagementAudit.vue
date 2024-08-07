<script setup>
import {onMounted, computed} from 'vue';
import store from '../../../store.js';
import DoughnutComponent from './DoughnutComponent.vue';

onMounted(async () => {
  await store.getApplicationAudits();
  console.log(store.applicationAudits);
});

const audits = computed(() => store.applicationAudits);
const labels = {
  null_error_action_percentage: 'Pourcentage de workflows n\'ayant pas de gestion des cas d\'erreur',
  workflow_nameless_percentage: 'Pourcentage de workflows n\'ayant pas de nom',
  variable_no_value_percentage: 'Pourcentage de variables n\'ayant pas de valeur par défaut',
  ww_object_nameless_percentage: 'Pourcentage de composants n\'ayant pas de nom'
};
</script>

<template>
  <div class="container-row  custom-scrollbar">
    <div class="label-column">
      <p v-for="(label, key) in labels" :key="key" class="label">{{ label }}</p>
    </div>
    <div class="chart-columns">
      <div v-for="audit in audits" :key="audit.cache_version" class="chart-card">
        <div class="chart-column-header">
          <h3>Version {{ audit.cache_version }}</h3>
        </div>
        <div class="doughnut-container">
          <div class="doughnut-item" v-for="(label, key) in labels" :key="key">
            <DoughnutComponent :label="label" :value="audit[key]"/>
            <p class="percentage">{{ audit[key] }}%</p>
          </div>
        </div>
      </div>

  </div>
  </div>
</template>

<style scoped>


.label-column {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 80px;
  padding-right: 16px;
  max-width: 267px;
}

.label {
  font-size: 1em;
  display: flex;
  align-items: center;
}

.chart-columns {
  display: flex;
  flex: 2;
  gap: 20px;
}

.chart-column-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;

}

.chart-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  max-width: 400px;
}

.doughnut-container {
  display: flex;
  flex-direction: column;
}

.doughnut-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.percentage {
  font-size: 1em;
  margin-top: 8px;
}
</style>
