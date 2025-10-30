<template>
  <div class="services-grid">
    <div
      v-for="service in filteredServices"
      :key="service.id"
      class="service-card"
    >
      <img
        v-if="service.image"
        :src="`/assets/${service.image}`"
        :alt="service.nombre"
        class="service-image"
      />
      <h3 class="service-name">{{ service.nombre }}</h3>
      <p class="service-description">{{ service.descripcion }}</p>
      <div class="service-actions">
        <router-link :to="`/servicios/${service.slug}`" class="link-detail"
          >Ver detalles</router-link
        >
        <a
          href="https://wa.me/5492964000000"
          target="_blank"
          class="link-whatsapp"
        >
          Solicitar asistencia
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useServicesStore } from '@/stores/services';

const route = useRoute();
const store = useServicesStore();

const category = computed(() => {
  const query = route.query.categoria;
  return query || null;
});

const filteredServices = computed(() => {
  if (!store.services.length) return [];
  if (!category.value) return store.services;
  return store.services.filter((s) => s.categoria === category.value);
});

onMounted(() => {
  if (!store.services.length) {
    store.fetchServices();
  }
});
</script>

<style scoped>
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
</style>