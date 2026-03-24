<template>
  <div>
    <!-- Hero -->
    <HeroBlock />

    <!-- Dashboard -->
    <Dashboard />

    <!-- INTRO -->
    <section class="intro-section">
      <h2 class="intro-title">
        Asesoramiento integral en accidentes y enfermedades laborales
      </h2>

      <p class="intro-text">
        Gracias por visitarnos.</p> 
        
      <p class="intro-text"> Aquí encontrará asesoramiento y recursos útiles para defender adecuadamente sus derechos frente a un accidente de trabajo o una enfermedad profesional.
      </p>

      <p class="intro-text">
        Puede continuar informándose aquí o, si lo prefiere, consultarnos sin compromiso para recibir asesoramiento inmediato y profesional.
      </p>

      <p class="intro-text intro-highlight">
        Siempre es mejor adelantarse, contar con información clara y con el acompañamiento de especialistas dedicados a la defensa de los derechos del trabajador.
      </p>

      <!-- ETAPAS -->
      <div class="intro-steps">
        <div class="step">
          <h3>Etapa Administrativa</h3>
          <p>
            Se desarrolla ante la Comisión Médica, donde se analiza el cuadro de salud y se determinan las prestaciones correspondientes.
          </p>
        </div>

        <div class="step">
          <h3>Etapa Judicial</h3>
          <p>
            Se inicia cuando el resultado administrativo no es adecuado, permitiendo reclamar judicialmente la cobertura y la indemnización.
          </p>
        </div>
      </div>

      <!-- BOTONES -->
      <div class="cta-container">
        <a 
          href="https://wa.me/5492964540752" 
          target="_blank" 
          class="cta-btn"
        >
          Consultar por WhatsApp
        </a>

        <a 
          href="https://www.facebook.com/profile.php?id=100063453618182&locale=es_LA" 
          target="_blank" 
          class="fb-btn"
        >
          <i class="fab fa-facebook"></i> Facebook
        </a>
      </div>
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
  padding: 20px;
}

.intro-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--secondary-color);
  text-align: center;
}

.intro-text {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 14px;
  line-height: 1.6;
  text-align: justify;
}

.intro-highlight {
  font-weight: 600;
  color: #333;
}

/* ETAPAS */
.intro-steps {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 25px;
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

/* BOTONES */
.cta-container {
  margin-top: 25px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  background: #25D366;
  color: white;
  padding: 12px 22px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.cta-btn:hover {
  background: #1ebe5d;
}

.fb-btn {
  background: #1877F2;
  color: white;
  padding: 12px 22px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.fb-btn:hover {
  background: #0f5dc2;
}
</style>