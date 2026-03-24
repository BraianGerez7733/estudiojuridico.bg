<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <div class="form-field">
      <label for="name">Nombre *</label>
      <input id="name" v-model="form.name" required />
    </div>
    <div class="form-field">
      <label for="email">Email *</label>
      <input id="email" type="email" v-model="form.email" required />
    </div>
    <div class="form-field">
      <label for="phone">Teléfono</label>
      <input id="phone" type="tel" v-model="form.phone" />
    </div>
    <div class="form-field">
      <label for="message">Mensaje *</label>
      <textarea id="message" v-model="form.message" rows="5" required></textarea>
    </div>
    <div class="form-field">
      <button type="submit" class="submit-button">Enviar</button>
    </div>
    <p v-if="submitted" class="success-message">Gracias por su mensaje. Nos pondremos en contacto a la brevedad.</p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
});
const submitted = ref(false);

function submitForm() {
  // En un sitio real se enviaría la información a un servidor o servicio de correo.
  // Aquí simplemente simulamos el envío.
  submitted.value = true;
  // Reset form after a short delay
  setTimeout(() => {
    form.name = '';
    form.email = '';
    form.phone = '';
    form.message = '';
    submitted.value = false;
  }, 3000);
}
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
label {
  font-size: 0.9rem;
  color: var(--secondary-color);
}
input,
textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(247, 199, 10, 0.3);
}
.submit-button {
  align-self: flex-start;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: filter 0.3s;
}
.submit-button:hover {
  filter: brightness(0.9);
}
.success-message {
  color: green;
  margin-top: 12px;
  font-size: 0.9rem;
}
</style>