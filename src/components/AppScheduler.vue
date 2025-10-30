<template>
  <div class="scheduler">
    <form @submit.prevent="submitForm">
      <div class="form-field">
        <label for="name">Nombre</label>
        <input id="name" v-model="name" required />
      </div>
      <div class="form-field">
        <label for="date">Fecha de la consulta</label>
        <input id="date" type="date" v-model="date" required />
      </div>
      <div class="form-field">
        <label for="time">Hora</label>
        <input id="time" type="time" v-model="time" required />
      </div>
      <div class="form-field">
        <label for="message">Motivo</label>
        <textarea id="message" v-model="message" rows="3"></textarea>
      </div>
      <button type="submit" class="schedule-button">Agendar</button>
    </form>
    <p v-if="scheduled" class="success-message">
      ¡Consulta agendada! Nos comunicaremos para confirmarla.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const date = ref('');
const time = ref('');
const message = ref('');
const scheduled = ref(false);

function submitForm() {
  // Simular envío de datos y mostrar confirmación
  scheduled.value = true;
  setTimeout(() => {
    name.value = '';
    date.value = '';
    time.value = '';
    message.value = '';
    scheduled.value = false;
  }, 3000);
}
</script>

<style scoped>
.scheduler {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
.schedule-button {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: filter 0.3s;
}
.schedule-button:hover {
  filter: brightness(0.9);
}
.success-message {
  color: green;
  font-size: 0.9rem;
}
</style>