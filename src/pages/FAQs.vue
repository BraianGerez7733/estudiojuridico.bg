<template>
  <section class="section">
    <h1 class="section-title">Preguntas Frecuentes</h1>
    <FAQ />
  </section>
</template>

<script setup>
import FAQ from '@/components/FAQ.vue';
</script>

<style scoped>
.section {
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
}
.section-title {
  margin-bottom: 24px;
  font-size: 2rem;
  color: var(--secondary-color);
}
</style>