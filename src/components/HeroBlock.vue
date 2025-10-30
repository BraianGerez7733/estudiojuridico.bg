<template>
  <section class="hero">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Defendemos tus derechos laborales</h1>
      <p class="hero-text">
        Hola, soy Braian Geréz. Soy abogado matriculado en Río Grande y estoy
        especializado en accidentes de trabajo y enfermedades profesionales.
        Defiendo los derechos de los trabajadores para que obtengan la
        indemnización y atención médica que les corresponde. Si sufriste un
        accidente laboral o tenés una enfermedad relacionada con tu trabajo,
        te brindamos asesoramiento legal integral y acompañamiento en todo el
        proceso.
      </p>
      <button class="cta-button" @click="goToApps">Agendar consulta gratuita</button>
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