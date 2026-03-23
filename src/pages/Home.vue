```vue
<template>
  <div>
    <!-- Bloque principal -->
    <HeroBlock />

    <!-- Dashboard -->
    <Dashboard />

    <!-- INTRO -->
    <section class="intro-section">
      <h2 class="intro-title">
        Asesoramiento integral en accidentes y enfermedades laborales
      </h2>

      <p class="intro-text">
        Brindamos asesoramiento especializado para trabajadores que han sufrido accidentes laborales o enfermedades profesionales.
        Lo acompañamos en cada etapa del proceso para garantizar una reparación justa.
      </p>

      <div class="intro-steps">
        <div class="step">
          <h3>Etapa Administrativa</h3>
          <p>
            Intervenimos ante la Comisión Médica, controlando el proceso y defendiendo sus derechos desde el inicio.
          </p>
        </div>

        <div class="step">
          <h3>Etapa Judicial</h3>
          <p>
            Si el resultado no es justo, iniciamos acciones judiciales para obtener la indemnización correspondiente.
          </p>
        </div>
      </div>

      <!-- CTA -->
      <a 
        href="https://wa.me/5492964540752" 
        target="_blank" 
        class="cta-btn"
      >
        Consultar por WhatsApp
      </a>
    </section>

    <!-- Servicios -->
    <section class="section">
      <h2 class="section-title">Nuestros servicios</h2>
      <ServicesGrid />
    </section>

    <!-- Contacto -->
    <LocalSEO />
  </div>
</template>

<script setup>
import HeroBlock from '@/components/HeroBlock.vue';
import Dashboard from '@/components/Dashboard.vue';
import ServicesGrid from '@/components/ServicesGrid.vue';
import LocalSEO from '@/components/LocalSEO.vue';
</script>

<style scoped>
.section {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  margin-bottom: 24px;
  font-size: 2rem;
  color: var(--secondary-color);
}

/* INTRO */
.intro-section {
  max-width: 900px;
  margin: 40px auto;
  text-align: center;
  padding: 20px;
}

.intro-title {
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: var(--secondary-color);
}

.intro-text {
  font-size: 1rem;
  color: #555;
  margin-bottom: 24px;
}

.intro-steps {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.step {
  background: #f8f8f8;
  padding: 16px;
  border-radius: 8px;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.step h3 {
  margin-bottom: 8px;
  color: var(--primary-color);
}

/* BOTÓN WHATSAPP */
.cta-btn {
  display: inline-block;
  margin-top: 20px;
  background: #25D366;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.cta-btn:hover {
  background: #1ebe5d;
}
</style>
```
