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
        this.services = await response.json();
      } catch (e) {
        console.error('Error al cargar servicios:', e);
      }
    }
  },
  getters: {
    categories: (state) => {
      const cats = state.services.map((s) => s.categoria);
      return [...new Set(cats)];
    },
    getServiceBySlug: (state) => {
      return (slug) => state.services.find((s) => s.slug === slug);
    }
  }
});