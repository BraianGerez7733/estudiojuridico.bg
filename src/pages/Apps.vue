<template>
  <section class="section">
    <h1 class="section-title">Aplicaciones útiles</h1>
    <div class="apps-grid">
      <div class="app-card">
        <h2>Calculadora de indemnización</h2>
        <AppCalculator />
      </div>
    </div>
  </section>
</template>

<script setup>
import AppCalculator from '@/components/AppCalculator.vue';
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
.apps-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.app-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.app-card h2 {
  margin-bottom: 16px;
  font-size: 1.5rem;
}
</style>
