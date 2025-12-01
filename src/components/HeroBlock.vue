<template>
  <section class="hero">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Defendemos tus derechos laborales</h1>
      <p class="hero-text"> Bienvenido a mi sitio web. Mi nombre es Braian Geréz y me dedico a la defensa de los derechos de los trabajadores accidentados o afectados por enfermedades profesionales. Actualmente ejerzo en la ciudad de Río Grande, ofreciendo atención personalizada, acompañamiento integral y representación en todas las instancias.
      <br><br>  
      Trabajo con compromiso, rigor técnico y celeridad en cada escrito y presentación, aplicando herramientas de última generación para garantizar un servicio jurídico eficaz y responsable.
      <br><br> 
      Para obtener más información, lo invito a explorar los diferentes enlaces disponibles en este sitio.
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
  background-image: url('/assets/estudio1.png');
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
