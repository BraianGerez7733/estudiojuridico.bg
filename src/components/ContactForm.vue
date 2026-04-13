<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <div class="form-header">
      <h3>Cuéntanos tu caso</h3>
      <p>Completa este formulario y un abogado especialista evaluará tu situación sin cargo.</p>
    </div>

    <div class="form-field">
      <label for="name">Nombre y Apellido *</label>
      <input id="name" v-model="form.name" required placeholder="Ej. Juan Pérez" />
    </div>

    <div class="form-row">
      <div class="form-field">
        <label for="phone">Teléfono / WhatsApp *</label>
        <input id="phone" type="tel" v-model="form.phone" required placeholder="Ej. 2964 123456" />
      </div>
      <div class="form-field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="form.email" placeholder="tu@email.com" />
      </div>
    </div>

    <div class="form-field">
      <label>¿Qué tipo de caso tienes? *</label>
      <select v-model="form.caseType" required class="form-select">
        <option value="" disabled>Seleccione una opción</option>
        <option value="accidente">Tuve un accidente en el trabajo o yendo al trabajo</option>
        <option value="enfermedad">Tengo una enfermedad por causa de mi trabajo</option>
        <option value="rechazo">La ART me rechazó el tratamiento</option>
        <option value="alta">Me dieron el alta pero sigo con dolores o molestias</option>
        <option value="otro">Otro problema (despidos, reclamo salarial, etc)</option>
      </select>
    </div>

    <div class="form-row" v-if="form.caseType && form.caseType !== 'otro'">
      <div class="form-field">
        <label>¿A qué ART te encuentras afiliado/a? (Si aplica)</label>
        <input v-model="form.artName" placeholder="Ej. Provincia ART, Prevención ART, etc." />
      </div>
      <div class="form-field">
        <label>¿Ya pasaste por Comisión Médica?</label>
        <select v-model="form.medicalBoard" class="form-select">
          <option value="no">No, aún no</option>
          <option value="en_tramite">En trámite</option>
          <option value="finalizado">Con dictamen final</option>
        </select>
      </div>
    </div>

    <div class="form-field">
      <label for="medicalStudies">¿Te han realizado estudios médicos? Cuéntanos cuáles (Opcional)</label>
      <input id="medicalStudies" v-model="form.medicalStudies" placeholder="Ej. Resonancia, Radiografías, Ecografías..." />
    </div>

    <div class="form-field">
      <label for="message">Breve relato de lo que pasó *</label>
      <textarea id="message" v-model="form.message" rows="4" required placeholder="Por favor, describe brevemente cómo sucedieron los hechos, diagnóstico o síntomas actuales..."></textarea>
    </div>

    <div class="form-field submit-container">
      <button type="submit" class="submit-button" :disabled="isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Solicitar Evaluación Gratuita' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="submitted" class="success-message">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="success-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>¡Gracias por contactarnos! Tu caso ha sido recibido y un abogado del estudio se comunicará contigo a la brevedad.</span>
      </div>
    </transition>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  name: '',
  email: '',
  phone: '',
  caseType: '',
  medicalBoard: 'no',
  artName: '',
  medicalStudies: '',
  message: ''
});

const submitted = ref(false);
const isSubmitting = ref(false);

function submitForm() {
  isSubmitting.value = true;
  
  // Simulación de envío
  setTimeout(() => {
    isSubmitting.value = false;
    submitted.value = true;

    // Aquí se podría integrar la lógica de enviar el form por WP de forma automatizada:
    // const text = `Hola! Mi nombre es ${form.name}. Motivo: ${form.caseType}. \nDetalle: ${form.message}`;
    // window.open(`https://wa.me/5492964540752?text=${encodeURIComponent(text)}`);

    setTimeout(() => {
      form.name = '';
      form.email = '';
      form.phone = '';
      form.caseType = '';
      form.medicalBoard = 'no';
      form.artName = '';
      form.medicalStudies = '';
      form.message = '';
      submitted.value = false;
    }, 5000);
  }, 1000);
}
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
}

.form-header {
  margin-bottom: 8px;
  border-bottom: 2px solid #f4f9fd;
  padding-bottom: 16px;
}
.form-header h3 {
  font-size: 1.5rem;
  color: var(--secondary-color, #2d3748);
  margin: 0 0 8px 0;
}
.form-header p {
  color: #718096;
  font-size: 0.95rem;
  margin: 0;
}

.form-row {
  display: flex;
  gap: 16px;
}
.form-row .form-field {
  flex: 1;
}

@media screen and (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 20px;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
}

input,
textarea,
.form-select {
  padding: 12px 14px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #fdfdfd;
  color: #2d3748;
  font-family: inherit;
  transition: all 0.3s;
}

input:focus,
textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #00b4d8;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
}

.submit-container {
  margin-top: 10px;
}

.submit-button {
  width: 100%;
  padding: 14px 24px;
  background-color: var(--primary-color, #f7c70a);
  color: var(--secondary-color, #2d3748);
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(247, 199, 10, 0.2);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(247, 199, 10, 0.3);
  filter: brightness(1.05);
}

.submit-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
  box-shadow: none;
  color: #718096;
}

.success-message {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 16px;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 0.95rem;
  font-weight: 500;
}

.success-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #22c55e;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>