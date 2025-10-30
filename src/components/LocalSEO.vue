<template>
  <section class="localseo">
    <div class="info">
      <h2>¿Dónde estamos?</h2>
      <p>Nos encontramos en la ciudad de Río Grande, Tierra del Fuego.</p>
      <p><strong>Dirección:</strong> Don Bosco 715</p>
      <p><strong>Teléfono:</strong> +54 2964 000000</p>
      <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 17:00</p>
    </div>
    <div class="map">
      <iframe
        title="Mapa de Río Grande"
        width="100%"
        height="300"
        style="border:0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAdummyapikey&amp;q=Don+Bosco+715+Rio+Grande+Tierra+del+Fuego"
      ></iframe>
    </div>
  </section>
</template>

<script setup>
// No script needed.
</script>

<style scoped>
.localseo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 0;
}
.info {
  font-size: 0.9rem;
  color: var(--dark-color);
}
.map {
  width: 100%;
}
@media (min-width: 768px) {
  .localseo {
    flex-direction: row;
  }
  .info,
  .map {
    flex: 1;
  }
}
</style>