<template>
  <div class="calculator">
    <form @submit.prevent="calculate">
      <div class="form-field">
        <label for="salary">Ingreso base mensual: promedio de los sueldos del año anterior al accidente o a la primera manifestación de la enfermedad, actualizados por RIPTE</label>
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

      <div class="form-field check">
        <label><input type="checkbox" v-model="itinere" /> Fue un accidente <em>in itinere</em> (yendo o volviendo del trabajo)</label>
      </div>
      <button type="submit" class="calc-button">Calcular</button>
    </form>

    <div v-if="result !== null" class="result">
      <p><strong>Coeficiente de edad:</strong> {{ coeficienteEdad.toFixed(2) }}</p>
      <p><strong>Indemnización (art. 14.2.a Ley 24.557):</strong> {{ formatCurrency(subtotal) }}</p>
      <p v-if="!itinere">
        <strong>Con el adicional del 20 % (art. 3 Ley 26.773):</strong>
        {{ formatCurrency(result) }}
      </p>
      <p v-else><em>En el accidente in itinere no corresponde el adicional del 20 % (art. 3 Ley 26.773).</em></p>
      <p v-if="percentage >= 66" class="aviso">Con una incapacidad del 66 % o más se considera <strong>total</strong>: el cálculo es distinto y corresponden además otras prestaciones. Consultanos.</p>
      <p v-else-if="percentage > 50" class="aviso">Con una incapacidad mayor al 50 % corresponde además una <strong>prestación adicional de pago único</strong> (art. 11.4 Ley 24.557), que este cálculo no incluye.</p>
      <small>* Cálculo orientativo con la fórmula legal (53 × ingreso base × % de incapacidad × 65/edad). No incluye intereses, ni la actualización hasta el pago, ni la comparación con el piso mínimo vigente, que puede ser mayor. Para un monto exacto, consultanos.</small>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const salary = ref(0)
const age = ref(0)
const percentage = ref(0)
const itinere = ref(false)
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

  // Adicional del 20 % (art. 3 Ley 26.773), salvo in itinere
  result.value = itinere.value ? subtotal.value : subtotal.value * 1.2
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
.check label { display: flex; gap: 8px; align-items: center; }
.aviso { color: #8a5a00; }
.result {
  background: #f1f1f1;
  padding: 12px;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
