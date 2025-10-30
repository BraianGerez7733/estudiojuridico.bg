<template>
  <div class="calculator">
    <form @submit.prevent="calculate">
      <div class="form-field">
        <label for="salary">Sueldo promedio últimos 12 meses (incluye aguinaldo)</label>
        <input id="salary" type="number" v-model.number="salary" min="0" step="0.01" />
      </div>

      <div class="form-field">
        <label for="age">Edad al momento del siniestro o PMI</label>
        <input id="age" type="number" v-model.number="age" min="1" max="65" />
      </div>

      <div class="form-field">
        <label for="percentage">Grado de incapacidad (%)</label>
        <input id="percentage" type="number" v-model.number="percentage" min="0" max="100" step="0.01" />
      </div>

      <button type="submit" class="calc-button">Calcular</button>
    </form>

    <div v-if="result !== null" class="result">
      <p><strong>Coeficiente de edad:</strong> {{ coeficienteEdad.toFixed(2) }}</p>
      <p><strong>Subtotal (sin 20 %):</strong> {{ formatCurrency(subtotal) }}</p>
      <p>
        <strong>Total con 20 % adicional (Ley 27.348):</strong>
        {{ formatCurrency(result) }}
      </p>
      <small>* Cálculo orientativo según fórmula legal. Para un monto exacto, consulte con un abogado.</small>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const salary = ref(0)
const age = ref(0)
const percentage = ref(0)
const coeficienteEdad = ref(0)
const subtotal = ref(0)
const result = ref(null)

function calculate() {
  if (salary.value <= 0 || age.value <= 0 || percentage.value <= 0) {
    result.value = null
    alert('Por favor, completá todos los campos con valores válidos.')
    return
  }

  // Coeficiente de edad: 65 / edad
  coeficienteEdad.value = 65 / age.value

  // Subtotal según fórmula base
  subtotal.value = salary.value * coeficienteEdad.value * (percentage.value / 100) * 53

  // Total con 20% adicional de ley
  result.value = subtotal.value * 1.2
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(value)
}
</script>

<style scoped>
.calculator {
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
input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}
input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(247, 199, 10, 0.3);
}
.calc-button {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: filter 0.3s;
}
.calc-button:hover {
  filter: brightness(0.9);
}
.result {
  background: #f1f1f1;
  padding: 12px;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
