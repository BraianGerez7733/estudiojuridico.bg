<template>
  <div>
    <!-- Bloque principal con presentación y llamado a la acción -->
    <HeroBlock />
    <!-- Estadísticas y visualizaciones del estudio -->
    <Dashboard />
    <!-- Servicios destacados -->
    <section class="section">
      <h2 class="section-title">Nuestros servicios</h2>
      <ServicesGrid />
    </section>
    <!-- Testimonios de clientes -->
    <section class="section">
      <h2 class="section-title">Testimonios</h2>
      <Testimonials />
    </section>
    <!-- Videos educativos -->
    <section class="section">
      <h2 class="section-title">Videos educativos</h2>
      <VideoBlock />
    </section>
    <!-- Ubicación y datos de contacto -->
    <LocalSEO />
  </div>
</template>

<script setup>
import HeroBlock from '@/components/HeroBlock.vue';
import Dashboard from '@/components/Dashboard.vue';
import ServicesGrid from '@/components/ServicesGrid.vue';
import Testimonials from '@/components/Testimonials.vue';
import VideoBlock from '@/components/VideoBlock.vue';
import LocalSEO from '@/components/LocalSEO.vue';
</script>

<style scoped>
.section {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  margin-bottom: 24px;
  font-size: 2rem;
  color: var(--secondary-color);
}
</style>