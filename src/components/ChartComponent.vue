<script setup>

import { defineProps } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  }
});

</script>

<template>
  <div class="circular-chart">
    <svg viewBox="0 0 36 36">
      <path class="circle-bg"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path class="circle"
            :stroke-dasharray="percentage + ', 100'"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831" />
    </svg>
    <div class="percentage">{{ percentage }}%</div>
  </div>
</template>

<style scoped>

.circular-chart {
  position: relative;
  width: 100px;
  height: 100px;
}
.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}
.circle {
  fill: none;
  stroke-width: 3.8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dasharray 0.3s ease;
}
.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
}
</style>
