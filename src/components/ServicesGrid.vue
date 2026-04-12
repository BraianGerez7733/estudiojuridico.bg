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
        <img
          v-if="service.image"
          :src="service.image"
          :alt="service.nombre"
          class="service-image"
        />
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
.service-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
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