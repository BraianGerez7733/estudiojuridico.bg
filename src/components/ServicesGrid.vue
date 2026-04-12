<template>
  <div>
    <div class="tabs">
      <button
        type="button"
        class="tab"
        :class="{ active: activeStage === 'administrativa' }"
        @click="activeStage = 'administrativa'"
      >
        Etapa Administrativa
      </button>

      <button
        type="button"
        class="tab"
        :class="{ active: activeStage === 'judicial' }"
        @click="activeStage = 'judicial'"
      >
        Etapa Judicial
      </button>
    </div>

    <div class="services-grid">
      <div
        v-for="service in filteredServices"
        :key="service.id"
        class="service-card"
      >
        <div v-if="service.iconType" class="service-icon-container">
          <svg v-if="service.iconType === 'shield'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <svg v-else-if="service.iconType === 'health'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
          <svg v-else-if="service.iconType === 'document'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          <svg v-else-if="service.iconType === 'urgent'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
          <svg v-else-if="service.iconType === 'scale'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.59 48.59 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg>
          <svg v-else-if="service.iconType === 'building'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
        </div>
        <h3 class="service-name">{{ service.nombre }}</h3>
        <p class="service-description">{{ service.descripcion }}</p>
        <div class="service-actions">
          <router-link :to="`/servicios/${service.slug}`" class="link-detail">
            Ver detalles
          </router-link>

          <a
            href="https://wa.me/5492964540752"
            target="_blank"
            rel="noopener noreferrer"
            class="link-whatsapp"
          >
            Solicitar asistencia
          </a>
        </div>
      </div>

      <div
        v-if="filteredServices.length === 0 && activeStage === 'judicial'"
        class="empty-state"
      >
        Los servicios de la etapa judicial estarán disponibles próximamente.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useServicesStore } from '@/stores/services';

const route = useRoute();
const store = useServicesStore();

const activeStage = ref('administrativa');

const category = computed(() => {
  const query = route.query.categoria;
  return query || null;
});

const filteredServices = computed(() => {
  if (!store.services.length) return [];

  let list = store.services.filter(
    (s) => (s.etapa || 'administrativa') === activeStage.value
  );

  if (!category.value) return list;
  return list.filter((s) => s.categoria === category.value);
});

onMounted(() => {
  if (!store.services.length) {
    store.fetchServices();
  }
});
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center;
}
.tab {
  padding: 12px 24px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.05rem;
  color: #4a5568;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}
.tab:hover {
  background: #f4f9fd;
  border-color: #00b4d8;
  color: #0077b6;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 119, 182, 0.1);
}
.tab.active {
  background: var(--secondary-color, #0077b6);
  border-color: var(--secondary-color, #0077b6);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.25);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.service-card {
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.service-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: #f4f9fd;
  border-radius: 12px;
  margin-bottom: 16px;
  color: #00b4d8;
  border: 1px solid #e1eef8;
}
.service-icon-container svg {
  width: 32px;
  height: 32px;
}
.service-name {
  font-size: 1.2rem;
  margin: 0 0 8px;
  color: var(--secondary-color);
}
.service-description {
  flex-grow: 1;
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 12px;
}
.service-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.link-detail,
.link-whatsapp {
  display: inline-block;
  padding: 6px 12px;
  font-size: 0.85rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}
.link-detail {
  background-color: var(--secondary-color);
  color: var(--light-color);
}
.link-detail:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
.link-whatsapp {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}
.link-whatsapp:hover {
  filter: brightness(0.9);
}

.empty-state {
  grid-column: 1 / -1;
  padding: 18px;
  background: #fafafa;
  border-radius: 8px;
  color: #666;
  text-align: center;
}
</style>