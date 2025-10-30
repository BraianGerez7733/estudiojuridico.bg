import { defineStore } from 'pinia';

/**
 * Store para datos del tablero de control (dashboard). Contiene métricas
 * agregadas y series de datos para representar visualmente el desempeño del
 * estudio. Los datos se cargan desde public/data/dashboard.json.
 */
export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboard: {
      casesRepresented: 0,
      resultsFavorable: 0,
      averageResponseDays: 0,
      averageCompensation: 0
    },
    monthlyCases: [],
    monthlyLabels: []
  }),
  actions: {
    async fetchDashboard() {
      try {
        const response = await fetch('/data/dashboard.json');
        const data = await response.json();
        this.dashboard = {
          casesRepresented: data.casesRepresented,
          resultsFavorable: data.resultsFavorable,
          averageResponseDays: data.averageResponseDays,
          averageCompensation: data.averageCompensation
        };
        this.monthlyCases = data.monthlyCases || [];
        this.monthlyLabels = data.monthlyLabels || [];
      } catch (e) {
        console.error('Error al cargar dashboard:', e);
      }
    }
  }
});