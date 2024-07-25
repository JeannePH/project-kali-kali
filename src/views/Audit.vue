<script setup>
import ChartComponent from "../components/ChartComponent.vue";

</script>


<template>
  <div>

    <div class="main-content">
      <h1>OCT Audit</h1>
      <div class="version-selectors">
        <div>
          <label for="version1">Version</label>
          <select id="version1" v-model="selectedVersion1">
            <option v-for="version in versions" :key="version" :value="version">
              {{ version }}
            </option>
          </select>
        </div>
        <div>
          <label for="version2">Version</label>
          <select id="version2" v-model="selectedVersion2">
            <option v-for="version in versions" :key="version" :value="version">
              {{ version }}
            </option>
          </select>
        </div>
        <div>
          <input type="checkbox" v-model="compare"> Comparer à une autre version
        </div>
        <button>Upload</button>
      </div>
      <div class="charts">
        <div v-for="(item, index) in data" :key="index">
          <p>{{ item.label }}</p>
          <div class="chart-container">
            <ChartComponent :percentage="item.values[selectedVersion1]" />
            <ChartComponent v-if="compare" :percentage="item.values[selectedVersion2]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>