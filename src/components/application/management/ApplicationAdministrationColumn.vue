<script setup>
import {onMounted, ref, watch} from 'vue';
import {useAdministrationStore} from "../../../stores/administration.js";

const props = defineProps({
  columns: {type: Array, required: true},
  title: {type: String, required: true},
  type: {type: String, required: true}
});

// Initialiser selectedColumns avec les clés sélectionnées dans le store
const selectedColumns = ref([]);

// Utilisation du store Pinia
const administrationStore = useAdministrationStore();

onMounted(() => {
  const propertyName = administrationStore.typeToProperty[props.type];
  selectedColumns.value = [...administrationStore[propertyName]];
  console.log(`Initial selected columns for ${props.type}:`, selectedColumns.value);
});

// Observer les changements dans selectedColumns et les propager au store
watch(selectedColumns, (newColumns) => {
  administrationStore.setSelectedColumns(props.type, newColumns);
});
</script>

<template>
  <div class="column-container" role="group" aria-labelledby="column-selection-title">
    <h3 id="column-selection-title" class="margin-bottom-24">{{ title }}</h3>
    <div v-for="(column, index) in columns" :key="column + '-' + index" class="column">
      <label class="checkbox-label" :for="'column-' + props.type + '-' + column + '-' + index">
        <input type="checkbox" :id="'column-' + props.type + '-' + column + '-' + index" :value="column" v-model="selectedColumns"/>
        {{ column }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.checkbox-label {
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}

.checkbox-label input[type="checkbox"] {
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

.column-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
}

.column {
  box-sizing: border-box;
  min-width: 270px;
  gap: 16px;

}
</style>