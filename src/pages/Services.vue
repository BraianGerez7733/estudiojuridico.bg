<template>
  <section class="section">
    <h1 class="section-title">Servicios</h1>
    <ServicesGrid />
  </section>
</template>

<script setup>
import ServicesGrid from '@/components/ServicesGrid.vue';
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