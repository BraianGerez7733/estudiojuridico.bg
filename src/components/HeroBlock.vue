<template>
  <section class="hero">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Defendemos tus derechos laborales</h1>
      <p class="hero-text">
        Hola, gracias por visitar mi sitio web, espdero te sea de agrado.
        Mi nombre es Braian Geréz, me especializo en defender los derechos 
        de los trabajadores accidentados o con enfermedades profesionales. 
        Por el momento solo trabajo en la ciudad de Río Grande.
        Brindo atención personalizada, asistencia a todas las audiencias
        Realizo mi trabajo con pasión, a gran velocidad para la realización 
        de los escritos y presentaciones, y con tecnología de última generación.

        Para conocernos más por favor sigue los enlaces cuidadosamente preparados
        para usted!
      </p>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goToApps() {
  router.push('/aplicaciones');
}
</script>

<style scoped>
.hero {
  position: relative;
  background-image: url('/assets/hero-bg.png');
  background-size: cover;
  background-position: center;
  color: var(--light-color);
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.hero-content {
  position: relative;
  max-width: 800px;
  z-index: 1;
}
.hero-title {
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: var(--primary-color);
}
.hero-text {
  font-size: 1.1rem;
  margin-bottom: 24px;
  line-height: 1.6;
}
.cta-button {
  padding: 14px 28px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: filter 0.3s;
}
.cta-button:hover {
  filter: brightness(0.9);
}
</style>
