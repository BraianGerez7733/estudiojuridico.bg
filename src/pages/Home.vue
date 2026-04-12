<template>
  <div class="home-wrapper">
    <!-- Componente Hero original -->
    <HeroBlock />

    <section class="intro-section">
      <h2 class="intro-title">
        Asesoramiento integral en accidentes y enfermedades laborales
      </h2>

      <p class="intro-text">
        Gracias por visitarnos. Aquí encontrará asesoramiento y recursos útiles para defender adecuadamente sus derechos frente a un accidente de trabajo o una enfermedad profesional.
      </p>

      <p class="intro-text">
        Puede continuar informándose aquí o, si lo prefiere, consultarnos sin compromiso para recibir asesoramiento inmediato y profesional.
      </p>

      <p class="intro-text intro-highlight">
        Siempre es mejor adelantarse, contar con información clara y con el acompañamiento de especialistas dedicados a la defensa de los derechos del trabajador.
      </p>

      <!-- Nueva Cronología Integrada -->
      <Timeline />

      <div class="cta-container">
        <a
          href="https://wa.me/5492964540752"
          target="_blank"
          class="cta-btn"
        >
          <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
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

    <section class="section">
      <h2 class="section-title">Nuestros servicios</h2>
      <ServicesGrid />
    </section>

    <!-- Nuevo Dashboard con Enlaces Externos -->
    <Dashboard />

    <!-- Nuevo Carrusel de Imágenes -->
    <section class="carousel-section">
      <Carousel />
    </section>

    <section class="location-section">
      <div class="location-container">
        <div class="location-info">
          <h2 class="location-title">¿Dónde estamos?</h2>
          <p class="location-text">
            Nos encontramos en la ciudad de Río Grande, Tierra del Fuego.
          </p>
          <p class="location-text"><strong>Dirección:</strong> Don Bosco 715</p>
          <p class="location-text"><strong>Teléfono:</strong> +54 2964 540752</p>
          <p class="location-text"><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 17:00</p>
        </div>

        <div class="location-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d294.6742145241244!2d-67.7096846!3d-53.7824798!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbc4b17000e2de44f%3A0xc6fa507670c04e59!2sEstudio%20Jur%C3%ADdico%20Braian%20Ger%C3%A9z!5e0!3m2!1ses-419!2sar!4v1774364355363!5m2!1ses-419!2sar"
            width="100%"
            height="350"
            style="border:0;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroBlock from '@/components/HeroBlock.vue';
import Dashboard from '@/components/Dashboard.vue';
import ServicesGrid from '@/components/ServicesGrid.vue';
import Carousel from '@/components/Carousel.vue';
import Timeline from '@/components/Timeline.vue';
</script>

<style scoped>
.home-wrapper {
  background-color: #fafbfc;
}

.carousel-section {
  padding: 0 20px;
  margin-top: -30px;
  position: relative;
  z-index: 5;
}
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

.cta-container {
  margin-top: 25px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: white;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.05rem;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5);
  background: linear-gradient(135deg, #1ebe5d, #0f7a6d);
}

.fb-btn {
  background: linear-gradient(135deg, #1877F2, #0d5bb5);
  color: white;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.05rem;
  box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fb-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(24, 119, 242, 0.5);
  background: linear-gradient(135deg, #0f5dc2, #094082);
}

.location-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

.location-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;
}

.location-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.location-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 14px;
  line-height: 1.6;
}

.location-map iframe {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
  .location-container {
    grid-template-columns: 1fr;
  }
}
</style>