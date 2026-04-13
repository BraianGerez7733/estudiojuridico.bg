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
            placeholder="Escribe tu respuesta..." 
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
import { ref, watch, nextTick, reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isOpen = ref(false);
const hasInteracted = ref(false);
const userInput = ref('');
const chatBody = ref(null);

const isWorkspace = ref(false);
watch(() => route.path, (newPath) => {
  isWorkspace.value = newPath.startsWith('/veredicta');
}, { immediate: true });

const step = ref(0);
const formData = reactive({
  name: '',
  phone: '',
  caseType: '',
  artName: '',
  medicalBoard: '',
  message: ''
});

const messages = ref([
  {
    sender: 'bot',
    text: "¡Hola! Bienvenido al asistente automático del Estudio Jurídico.\n\nPara poder asesorarte te haré unas breves preguntas guiadas (como el formulario de la web).\n\nEscribe **1** para comenzar la guía.\nEscribe **2** para saltar todo e ir directo a WhatsApp."
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
  
  if (step.value === 0) {
    if (input === '1') {
      step.value = 1;
      reply = "¡Perfecto! Empecemos. Escribe tu **Nombre y Apellido**:";
    } else if (input === '2') {
      reply = "Redirigiendo a WhatsApp... 📲";
      setTimeout(() => {
        window.open("https://wa.me/5492964540752?text=Hola,%20quisiera%20hacer%20una%20consulta.", '_blank');
      }, 1000);
    } else {
      reply = "Por favor, escribe **1** o **2**.";
    }
  } 
  else if (step.value === 1) {
    formData.name = input;
    step.value = 2;
    reply = `¡Gracias **${formData.name}**!\n\n¿Cuál es tu número de **Teléfono / WhatsApp**?`;
  }
  else if (step.value === 2) {
    formData.phone = input;
    step.value = 3;
    reply = "¿Qué tipo de caso tienes? (Escribe el número):\n**1** - Accidente de trabajo\n**2** - Enfermedad profesional\n**3** - Rechazo de ART / Alta\n**4** - Otro (Despido, sueldos, etc)";
  }
  else if (step.value === 3) {
    const valid = ['1', '2', '3', '4'];
    if (!valid.includes(input)) {
      reply = "Por favor, responde solamente con **1**, **2**, **3** o **4**.";
    } else {
      const types = {
        '1': 'Accidente de trabajo',
        '2': 'Enfermedad profesional',
        '3': 'Rechazo/Alta de ART',
        '4': 'Otro caso laboral'
      };
      formData.caseType = types[input];
      
      if (input === '4') {
        step.value = 5; // Salta ART
        reply = "Entendido. Por favor, escribe un **breve relato** de lo que pasó o cuál es tu consulta principal:";
      } else {
        step.value = 4;
        reply = "¿A qué **ART** te encuentras afiliado/a?\n(Ej. Provincia, Prevención. Si no sabes escribe 'No sé')";
      }
    }
  }
  else if (step.value === 4) {
    formData.artName = input;
    step.value = 4.5;
    reply = "¿Ya pasaste por Comisión Médica? (Escribe el número):\n**1** - No, aún no\n**2** - En trámite\n**3** - Con dictamen final";
  }
  else if (step.value === 4.5) {
    const valid = ['1', '2', '3'];
    if (!valid.includes(input)) {
      reply = "Responde con **1**, **2** o **3** por favor.";
    } else {
      const boards = {'1': 'Aún no', '2': 'En trámite', '3': 'Finalizado'};
      formData.medicalBoard = boards[input];
      step.value = 5;
      reply = "Casi terminamos. Por favor, escribe un **breve relato** de lo que te pasó (hechos, dolores o estado actual):";
    }
  }
  else if (step.value === 5) {
    formData.message = input;
    step.value = 6;
    reply = "¡Excelente! Hemos recopilado tu información. \nEscribe cualquier tecla para generar el mensaje final y enviarlo por WhatsApp al 100%.";
  }
  else if (step.value === 6) {
    reply = "Abriendo WhatsApp con tus datos... 📲";
    const text = `*Nueva Consulta Asistente Virtual*\n\n*Nombre:* ${formData.name}\n*Teléfono:* ${formData.phone}\n*Caso:* ${formData.caseType}`
      + (formData.caseType !== 'Otro caso laboral' ? `\n*ART:* ${formData.artName}\n*Comisión Médica:* ${formData.medicalBoard}` : '')
      + `\n*Detalles:* ${formData.message}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/5492964540752?text=${encodeURIComponent(text)}`, '_blank');
      // Reset chatbot form optional
      step.value = 0;
    }, 1000);
  }

  if (reply) {
    messages.value.push({ sender: 'bot', text: reply });
    scrollToBottom();
  }
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
  height: 450px;
  max-height: calc(100vh - 120px);
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
