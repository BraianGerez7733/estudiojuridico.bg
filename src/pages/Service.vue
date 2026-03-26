<template>
  <!-- LOADING -->
  <section class="section" v-if="isLoading">
    <p>Cargando servicio...</p>
  </section>

  <!-- SERVICIO ENCONTRADO -->
  <section class="section" v-else-if="service">
    <h1 class="service-title">{{ service.nombre }}</h1>

    <div class="service-meta">
      <img
        v-if="service.image"
        :src="service.image"
        :alt="service.nombre"
        class="service-image"
      />

      <!-- CONTENIDO ESTRUCTURADO (Accidentes de trabajo) -->
      <template v-if="isStructured">
        <div class="service-content servicio-detalle">
          <p v-for="(p, i) in generalParagraphs" :key="i">
            {{ p }}
          </p>
        </div>

        <!-- SUB-PESTAÑAS -->
        <div class="subtabs">
          <button
            type="button"
            class="subtab"
            :class="{ active: activeTab === 'aceptacion_total' }"
            @click="activeTab = 'aceptacion_total'"
          >
            Aceptación total
          </button>

          <button
            type="button"
            class="subtab"
            :class="{ active: activeTab === 'rechazo_parcial' }"
            @click="activeTab = 'rechazo_parcial'"
          >
            Rechazo parcial
          </button>

          <button
            type="button"
            class="subtab"
            :class="{ active: activeTab === 'rechazo_total' }"
            @click="activeTab = 'rechazo_total'"
          >
            Rechazo total
          </button>
        </div>

        <!-- CONTENIDO DE LA SUB-PESTAÑA -->
        <div class="service-content servicio-detalle">
          <p v-for="(p, i) in tabParagraphs" :key="i">
            {{ p }}
          </p>
        </div>
      </template>

      <!-- CONTENIDO CLÁSICO (resto de los servicios) -->
      <div
        v-else-if="typeof service.contenido === 'string'"
        v-html="service.contenido"
        class="service-content servicio-detalle"
      ></div>

      <div
        v-else-if="service.contenido_html"
        v-html="service.contenido_html"
        class="service-content servicio-detalle"
      ></div>

      <p v-else class="service-content servicio-detalle">
        {{ service.descripcion }}
      </p>
    </div>

    <button class="cta-button" @click="openWhatsApp">
      Solicitar asistencia
    </button>
  </section>

  <!-- NO ENCONTRADO -->
  <section class="section" v-else>
    <p>No se encontró el servicio solicitado.</p>
  </section>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useServicesStore } from '@/stores/services';

const route = useRoute();
const store = useServicesStore();

const isLoading = ref(false);
const activeTab = ref('aceptacion_total');

const slug = computed(() => route.params.slug);
const service = computed(() => store.getServiceBySlug(slug.value));

function openWhatsApp() {
  window.open(
    'https://wa.me/5492964540752',
    '_blank',
    'noopener,noreferrer'
  );
}

async function ensureServicesLoaded() {
  if (store.services.length) return;
  isLoading.value = true;
  try {
    await store.fetchServices();
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  ensureServicesLoaded();
});

watch(slug, () => {
  ensureServicesLoaded();
});

/* 🔹 Detecta si el contenido es estructurado */
const isStructured = computed(() => {
  return (
    service.value &&
    typeof service.value.contenido === 'object' &&
    typeof service.value.contenido.general === 'string' &&
    typeof service.value.contenido.tabs === 'object'
  );
});

/* 🔹 Texto general */
const generalParagraphs = computed(() => {
  if (!isStructured.value) return [];
  return service.value.contenido.general
    .split('\n\n')
    .filter(Boolean);
});

/* 🔹 Texto de la sub-pestaña */
const tabParagraphs = computed(() => {
  if (!isStructured.value) return [];
  const text =
    service.value.contenido.tabs?.[activeTab.value] || '';
  return text.split('\n\n').filter(Boolean);
});
</script>

<style scoped>
.section {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.servicio-detalle,
.servicio-detalle p,
.servicio-detalle li {
  text-align: justify;
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

/* Sub-pestañas */
.subtabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.subtab {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  font-weight: 600;
}

.subtab.active {
  border-color: var(--secondary-color);
}

/* CTA */
.cta-button {
  margin-top: 24px;
  padding: 12px 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.cta-button:hover {
  filter: brightness(0.9);
}
</style>