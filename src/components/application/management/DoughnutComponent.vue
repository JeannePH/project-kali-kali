<script setup>
import { onMounted, ref, watch } from 'vue';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';

Chart.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  label: String,
  value: Number
});

const canvas = ref(null);

onMounted(() => {
  const chart = new ChartJS(canvas.value, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [props.value, 100 - props.value],
        backgroundColor: ['#099AF2', '#E0E0E0'],
      }],
      labels: [props.label, 'Other']
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false }
      }
    }
  });

  watch(() => props.value, (newVal) => {
    chart.data.datasets[0].data[0] = newVal;
    chart.data.datasets[0].data[1] = 100 - newVal;
    chart.update();
  });
});
</script>

<template>
  <div class="doughnut">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.doughnut {
  width: 100px;
  height: 100px;
  margin: 10px;
  text-align: center;
}
</style>
