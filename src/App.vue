<template>
  <div class="app-wrapper">
    <!-- Navegación principal -->
    <Navbar />
    <!-- Contenido de la página activa -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- Pie de página -->
    <Footer />
    <!-- Botones flotantes de WhatsApp -->
    <div class="whatsapp-buttons">
      <a
        href="https://wa.me/5492964000000"
        target="_blank"
        aria-label="Chatear por WhatsApp"
        class="whatsapp-button top-left"
      >
        <i class="fab fa-whatsapp"></i>
      </a>
      <a
        href="https://wa.me/5492964000000"
        target="_blank"
        aria-label="Chatear por WhatsApp"
        class="whatsapp-button top-right"
      >
        <i class="fab fa-whatsapp"></i>
      </a>
      <a
        href="https://wa.me/5492964000000"
        target="_blank"
        aria-label="Chatear por WhatsApp"
        class="whatsapp-button bottom-right"
      >
        <i class="fab fa-whatsapp"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - 160px);
  /* Deja espacio para header y footer */
  display: flex;
  flex-direction: column;
}

.whatsapp-buttons {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
}

.whatsapp-button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  transition: transform 0.3s ease;
}

.whatsapp-button:hover {
  transform: scale(1.1);
}

.top-left {
  top: 80px;
  left: 16px;
  position: absolute;
}

.top-right {
  top: 80px;
  right: 16px;
  position: absolute;
}

.bottom-right {
  bottom: 80px;
  right: 16px;
  position: absolute;
}
</style>