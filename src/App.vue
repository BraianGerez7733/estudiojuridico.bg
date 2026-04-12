<template>
  <div class="app-wrapper">
    <!-- Navegación principal -->
    <Navbar v-if="!isWorkspace" />
    <!-- Contenido de la página activa -->
    <main :class="isWorkspace ? 'workspace-content' : 'main-content'">
      <router-view />
    </main>
    <!-- Pie de página -->
    <Footer v-if="!isWorkspace" />
    <!-- Widget de Chat Interactivo -->
    <ChatBot />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ChatBot from '@/components/ChatBot.vue';

const route = useRoute();
const isWorkspace = computed(() => route.path.startsWith('/veredicta'));
</script>

<style scoped>
.workspace-content {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.main-content {
  min-height: calc(100vh - 160px);
  padding-top: 85px; /* Compensa la navbar fija */
  display: flex;
  flex-direction: column;
}

.whatsapp-buttons {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
}

.whatsapp-button {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  pointer-events: auto;
  transition: all 0.3s ease;
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

.whatsapp-button:hover {
  transform: scale(1.15) translateY(-5px);
  animation: none;
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
  background: linear-gradient(135deg, #1ebe5d, #0f7a6d);
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