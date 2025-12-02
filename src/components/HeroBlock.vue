<template>
  <section class="hero">
  <video class="hero-video-background" autoplay muted loop playsinline>
      <source src="/assets/Balanza_de_fondo.mp4" type="video/mp4">
      Tu navegador no soporta el tag de video.
    </video>
  <div class="overlay"></div>
  <div class="hero-title-box">
  <h1 class="hero-main-title">ESTUDIO JURÍDICO</h1>
  <h2 class="hero-sub-title">Braian Geréz</h2>
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

.hero-title-box {
  position: relative; /* CAMBIO: Necesario para posicionar los pseudo-elementos */
  z-index: 3;
  text-align: center;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.hero-main-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0;
}

.hero-sub-title {
  font-size: 2rem;
  margin-top: 10px;
}
/* 🌟 NUEVO ESTILO PARA EL VIDEO DE FONDO 🌟 */
.hero-video-background {
  position: absolute; /* Permite posicionarlo con precisión */
  top: 0;
  left: 0;
  width: 100%; /* Cubre todo el ancho del contenedor .hero */
  height: 100%; /* Cubre toda la altura del contenedor .hero */
  object-fit: cover; /* Asegura que el video cubra sin distorsionarse */
  z-index: 1; /* Debe estar bajo el overlay (z-index: 2) y el título (z-index: 3) */
}

/* Es importante que el overlay tenga z-index: 2 para que se vea la sombra sobre el video */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2; /* Asegúrese de que este valor sea mayor al del video (1) */
}
</style>
