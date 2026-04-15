<template>
  <div class="timeline-wrapper">
    <div class="timeline-header">
      <h2>El Proceso Legal</h2>
      <p>Cronología del Reclamo por Accidente (Timeline).</p>
    </div>

    <div class="timeline">
      <div class="timeline-container t-left">
        <router-link to="/hechos" class="timeline-content interactive-timeline">
          <h3>1. El Hecho</h3>
          <p>Se produce el accidente o se detecta la enfermedad profesional.</p>
        </router-link>
      </div>
      <div class="timeline-container t-right">
        <router-link to="/srt" class="timeline-content interactive-timeline">
          <h3>2. SRT y Comisión Médica</h3>
          <p>Evaluación administrativa del daño. Frecuentemente subestiman el grado de incapacidad.</p>
        </router-link>
      </div>
      <div class="timeline-container t-left">
        <router-link to="/impugnacion" class="timeline-content highlight-yellow interactive-timeline">
          <h3>3. Impugnación</h3>
          <p>Se rechaza el dictamen de la Comisión y se solicita revisión formal con nuestros médicos de parte.</p>
        </router-link>
      </div>
      <div class="timeline-container t-right">
        <router-link to="/via-judicial" class="timeline-content highlight-cyan interactive-timeline">
          <h3>4. Vía Judicial</h3>
          <p>Ante la justicia laboral de Tierra del Fuego, exigimos reparación íntegra apoyada en estricta evidencia científica.</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-wrapper {
  margin: 60px auto;
  max-width: 1000px;
  padding: 20px;
  background-color: #f4f9fd;
  border-radius: 12px;
}

.timeline-header {
  text-align: center;
  margin-bottom: 50px;
}
.timeline-header h2 {
  font-size: 2.2rem;
  color: #2d3748;
  margin-bottom: 10px;
}
.timeline-header p {
  color: #4a5568;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

/* Base Line */
.timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background-color: #00b4d8;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -2px;
}

.timeline-container {
  padding: 10px 40px;
  position: relative;
  background-color: transparent;
  width: 50%;
}

/* Circles */
.timeline-container::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  right: -12px;
  background-color: #f4f9fd;
  border: 4px solid #0077b6;
  border-radius: 50%;
  top: 20px;
  z-index: 1;
}

.t-left { left: 0; }
.t-right { left: 50%; }

.t-right::after { left: -16px; }

.timeline-content {
  padding: 25px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: block;
  text-decoration: none;
}

.interactive-timeline {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.interactive-timeline:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.timeline-content h3 {
  color: #2d3748;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.timeline-content p {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Highlights exactly as in the photo */
.highlight-yellow h3 {
  color: #f7c70a;
}
.highlight-cyan h3 {
  color: #00b4d8;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .timeline::after {
    left: 45px;
  }
  .timeline-container {
    width: 100%;
    padding-left: 90px;
    padding-right: 20px;
  }
  .timeline-container::after {
    left: 31px;
  }
  .t-right {
    left: 0%;
  }
}
</style>
