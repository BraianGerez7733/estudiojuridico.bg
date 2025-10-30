<template>
  <section class="section">
    <h1 class="section-title">Contacto</h1>
    <ContactForm />
  </section>
</template>

<script setup>
import ContactForm from '@/components/ContactForm.vue';
</script>

<style scoped>
.section {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}
.section-title {
  margin-bottom: 24px;
  font-size: 2rem;
  color: var(--secondary-color);
}
</style>