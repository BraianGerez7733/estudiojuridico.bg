<template>
  <section class="hero">
  <div class="overlay"></div>

  <div class="hero-video-container">
    <video autoplay muted loop playsinline class="hero-video">
      <source src="/assets/Logo-3-[remix].mp4" type="video/mp4" />
    </video>
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
.hero-video-container {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
}

.hero-video {
  width: 380px;
  max-width: 90%;
  border-radius: 12px;
  object-fit: cover;
}

</style>
