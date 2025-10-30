<template>
  <section class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <h3>{{ dashboard.casesRepresented }}</h3>
        <p>Casos representados</p>
      </div>
      <div class="stat-card">
        <h3>{{ dashboard.resultsFavorable }}%</h3>
        <p>Resultados favorables</p>
      </div>
      <div class="stat-card">
        <h3>{{ dashboard.averageResponseDays }} días</h3>
        <p>Tiempo de respuesta ART</p>
      </div>
      <div class="stat-card">
        <h3>$ {{ formatCurrency(dashboard.averageCompensation) }}</h3>
        <p>Indemnización promedio</p>
      </div>
    </div>
    <div class="chart-container">
      <canvas ref="chartCanvas" aria-label="Gráfico de casos por mes" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
const store = useDashboardStore();
const dashboard = store.dashboard;

function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(value);
}

onMounted(async () => {
  if (!dashboard.casesRepresented) {
    await store.fetchDashboard();
  }
  // Render bar chart for monthly cases
  const ctx = chartCanvas.value.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: store.monthlyLabels,
      datasets: [
        {
          label: 'Casos atendidos',
          data: store.monthlyCases,
          backgroundColor: store.monthlyLabels.map(() => 'rgba(247, 199, 10, 0.6)'),
          borderColor: store.monthlyLabels.map(() => 'rgba(247, 199, 10, 1)'),
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
</script>

<style scoped>
.dashboard {
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.stat-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.stat-card h3 {
  margin: 0;
  font-size: 2rem;
  color: var(--secondary-color);
}
.stat-card p {
  margin: 8px 0 0;
  color: #555;
  font-size: 0.9rem;
}
.chart-container {
  width: 100%;
  height: 300px;
}
</style>