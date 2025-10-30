<template>
  <section class="section" v-if="service">
    <h1 class="service-title">{{ service.nombre }}</h1>
    <div class="service-meta">
      <img
        v-if="service.image"
        :src="`/assets/${service.image}`"
        :alt="service.nombre"
        class="service-image"
      />
      <div v-html="service.contenido" class="service-content" />
    </div>
    <button class="cta-button" @click="openWhatsApp">
      Solicitar asistencia
    </button>
  </section>
  <section class="section" v-else>
    <p>No se encontró el servicio solicitado.</p>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useServicesStore } from '@/stores/services';

const route = useRoute();
const store = useServicesStore();

const slug = computed(() => route.params.slug);
const service = computed(() => store.getServiceBySlug(slug.value));

function openWhatsApp() {
  window.open('https://wa.me/5492964000000', '_blank');
}

onMounted(() => {
  if (!store.services.length) {
    store.fetchServices();
  }
});
</script>

<style scoped>
.section {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}
.service-title {
  margin-bottom: 16px;
  font-size: 2rem;
  color: var(--secondary-color);
}
.service-meta {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.service-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.service-content {
  line-height: 1.6;
  color: var(--dark-color);
}
.cta-button {
  margin-top: 24px;
  padding: 12px 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: filter 0.3s;
}
.cta-button:hover {
  /* Oscurece ligeramente el color primario en hover */
  filter: brightness(0.9);
}
</style>