import { defineStore } from 'pinia';

/**
 * Pinia store para gestionar la lista de servicios ofrecidos por el estudio.
 * Carga los datos desde un archivo JSON ubicado en public/data/services.json.
 */
export const useServicesStore = defineStore('services', {
  state: () => ({
    services: []
  }),

  actions: {
    async fetchServices() {
      try {
        const response = await fetch('/data/services.json');
        const data = await response.json();

        // Normalización defensiva:
        // - si no viene "etapa", se asume administrativa
        this.services = data.map((s) => ({
          ...s,
          etapa: s.etapa || 'administrativa'
        }));
      } catch (e) {
        console.error('Error al cargar servicios:', e);
      }
    }
  },

  getters: {
    categories: (state) => {
      const cats = state.services.map((s) => s.categoria).filter(Boolean);
      return [...new Set(cats)];
    },

    getServiceBySlug: (state) => {
      return (slug) => state.services.find((s) => s.slug === slug);
    },

    // 🔹 Nuevo getter útil (opcional)
    getServicesByEtapa: (state) => {
      return (etapa) => state.services.filter((s) => s.etapa === etapa);
    }
  }
});