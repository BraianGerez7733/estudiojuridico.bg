<template>
  <div class="chatbot-wrapper" v-if="!isWorkspace">
    <!-- Botón Flotante -->
    <button 
      class="chat-toggle-btn" 
      @click="toggleChat"
      :class="{ 'pulse': !isOpen && !hasInteracted }"
      aria-label="Abrir chat de ayuda"
    >
      <i v-if="!isOpen" class="fab fa-whatsapp"></i>
      <i v-else class="fas fa-times"></i>
    </button>

    <!-- Ventana del Chat -->
    <transition name="chat-slide">
      <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
          <div class="avatar">
            <i class="fab fa-whatsapp"></i>
          </div>
          <div>
            <h4>Asistente Virtual</h4>
            <span class="status">En línea</span>
          </div>
        </div>
        
        <div class="chat-body" ref="chatBody">
          <div 
            v-for="(msg, index) in messages" 
            :key="index"
            :class="['message-wrapper', msg.sender === 'user' ? 'user' : 'bot']"
          >
            <div class="message-bubble" v-html="formatText(msg.text)"></div>
          </div>
        </div>

        <form @submit.prevent="sendMessage" class="chat-footer">
          <input 
            type="text" 
            v-model="userInput" 
            placeholder="Escribe 1, 2 o 3..." 
            aria-label="Mensaje"
          />
          <button type="submit" :disabled="!userInput.trim()">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isOpen = ref(false);
const hasInteracted = ref(false);
const userInput = ref('');
const chatBody = ref(null);

// Mismo filtro que en App.vue para ocultarlo en Veredicta (workspace)
const isWorkspace = ref(false);
watch(() => route.path, (newPath) => {
  isWorkspace.value = newPath.startsWith('/veredicta');
}, { immediate: true });

const messages = ref([
  {
    sender: 'bot',
    text: "¡Hola! Bienvenido al asistente automático del Estudio Jurídico.\n\nPara asesorarte rápidamente, dime ¿cuál de estas opciones se ajusta a tu caso? (Escribe el número):\n\n1️⃣ Accidente de Trabajo\n2️⃣ Enfermedad Profesional u otro reclamo\n3️⃣ Hablar ahora mismo con un abogado por WhatsApp"
  }
]);

function toggleChat() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    hasInteracted.value = true;
    scrollToBottom();
  }
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  messages.value.push({ sender: 'user', text });
  userInput.value = '';
  scrollToBottom();

  setTimeout(() => {
    processBotReply(text);
  }, 500);
}

function processBotReply(input) {
  let reply = "";
  
  if (input === '1') {
    reply = "📌 Has seleccionado **Accidente de Trabajo**.\nEn estos casos es fundamental actuar rápido y notificar a la ART. ¿Te gustaría que un abogado revise tus estudios o el rechazo?\nEscribe **3** para enviarnos un WhatsApp con tus detalles.";
  } 
  else if (input === '2') {
    reply = "📌 Has seleccionado **Enfermedad Profesional / Extralaboral**.\nReclamar enfermedades (como hernias, tendinitis, estrés) es muy factible, pero necesitamos evaluar tu puesto de trabajo.\nEscribe **3** para pasarnos los datos precisos por WhatsApp.";
  } 
  else if (input === '3') {
    reply = "Redirigiendo a nuestro canal de atención por WhatsApp... 📲";
    // Redirección simulada a WhatsApp (abre en nueva pestaña)
    setTimeout(() => {
      window.open("https://wa.me/5492964540752?text=Hola,%20me%20gustar%C3%ADa%20hablar%20con%20un%20abogado%20sobre%20mi%20caso.", '_blank');
    }, 1000);
  } 
  else {
    reply = "🤔 No he entendido esa opción. Por favor, escribe solamente un número válido:\n**1** (Accidente), **2** (Enfermedades), o **3** (WhatsApp directo).";
  }

  messages.value.push({ sender: 'bot', text: reply });
  scrollToBottom();
}

function formatText(text) {
  // Convertir doble asterisco a negrita y los saltos de línea
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return formatted.replace(/\n/g, '<br>');
}

function scrollToBottom() {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
  });
}
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25d366;
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 119, 182, 0.4);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chat-toggle-btn:hover {
  transform: scale(1.1);
  background: #1ebe5d;
}

.pulse {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  max-width: calc(100vw - 48px);
  height: 500px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e1e8ed;
}

.chat-header {
  background: #075e54;
  color: #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-header h4 {
  margin: 0;
  font-size: 1.1rem;
}

.status {
  font-size: 0.8rem;
  color: #a0aec0;
  display: flex;
  align-items: center;
  gap: 4px;
}
.status::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #48bb78;
  border-radius: 50%;
}

.avatar {
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

.chat-body {
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  background: #efeae2;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-wrapper {
  display: flex;
  width: 100%;
}

.message-wrapper.user {
  justify-content: flex-end;
}

.message-wrapper.bot {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.message-wrapper.user .message-bubble {
  background: #dcf8c6;
  color: #2d3748;
  border-bottom-right-radius: 0;
}

.message-wrapper.bot .message-bubble {
  background: #ffffff;
  color: #2d3748;
  border: 1px solid #e2e8f0;
  border-bottom-left-radius: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.chat-footer {
  display: flex;
  padding: 12px;
  background: #fff;
  border-top: 1px solid #e1e8ed;
}

.chat-footer input {
  flex-grow: 1;
  border: 1px solid #cbd5e0;
  padding: 10px 12px;
  border-radius: 20px;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.chat-footer input:focus {
  border-color: #075e54;
}

.chat-footer button {
  background: none;
  border: none;
  color: #075e54;
  font-size: 1.2rem;
  margin-left: 10px;
  cursor: pointer;
  padding: 0 8px;
  display: flex;
  align-items: center;
}

.chat-footer button:disabled {
  color: #cbd5e0;
  cursor: not-allowed;
}

/* Transitions */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s ease;
  transform-origin: bottom right;
}
.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(20px);
}
</style>
