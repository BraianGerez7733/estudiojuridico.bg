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

  <div class="map-container">
    <h3>Ubicación</h3>
    <p>Don Bosco 715, Río Grande</p>

    <iframe
      src="https://www.google.com/maps?q=Don%20Bosco%20715%20Rio%20Grande&output=embed"
      width="100%"
      height="300"
      style="border:0; border-radius:8px;"
      loading="lazy">
    </iframe>

    <a
      href="https://maps.app.goo.gl/p6wW6HAxqx2YUetj9"
      target="_blank"
      rel="noopener noreferrer"
      class="location-button"
    >
      Cómo llegar
    </a>
  </div>
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
  submitted.value = true;
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
.map-container {
  margin-top: 30px;
}
.location-button {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 16px;
  background: var(--primary-color);
  color: black;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}
</style>