<template>
  <div class="timeline-wrapper">
    <div class="timeline-header">
      <h2>El Proceso Legal</h2>
      <p>Cronología del Reclamo por Accidente (Timeline).</p>
    </div>

    <div class="timeline">
      <div class="timeline-container t-left">
        <button
          type="button"
          class="timeline-content interactive-timeline timeline-button"
          @click="showHechoVideo = true"
        >
          <h3>1. El Hecho</h3>
          <p>Se produce el accidente o se detecta la enfermedad profesional.</p>
        </button>
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

    <div
      v-if="showHechoVideo"
      class="video-modal-backdrop"
      @click.self="showHechoVideo = false"
    >
      <div class="video-modal" role="dialog" aria-modal="true" aria-label="Video explicativo sobre el hecho">
        <button
          type="button"
          class="close-modal"
          aria-label="Cerrar video"
          @click="showHechoVideo = false"
        >
          ×
        </button>
        <div class="short-video-frame">
          <iframe
            src="https://www.youtube.com/embed/nlMDM5YjMEY?autoplay=1&rel=0&modestbranding=1"
            title="Short explicativo: El Hecho"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showHechoVideo = ref(false);
</script>

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

.timeline-button {
  width: 100%;
  border: 0;
  text-align: left;
  font-family: inherit;
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

.highlight-yellow h3 { color: #f7c70a; }
.highlight-cyan h3 { color: #00b4d8; }

.video-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(0, 0, 0, 0.72);
}

.video-modal {
  position: relative;
  width: min(300px, 78vw);
  background: #111111;
  border-radius: 14px;
  padding: 10px;
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.42);
}

.close-modal {
  position: absolute;
  top: -12px;
  right: -8px;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 50%;
  background: #ffffff;
  color: #111111;
  font-size: 1.45rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.3);
}

.short-video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  border-radius: 10px;
  background: #000000;
}

.short-video-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@media screen and (max-width: 768px) {
  .timeline::after { left: 45px; }
  .timeline-container {
    width: 100%;
    padding-left: 90px;
    padding-right: 20px;
  }
  .timeline-container::after { left: 31px; }
  .t-right { left: 0%; }

  .video-modal {
    width: min(260px, 72vw);
    padding: 8px;
  }
}
</style>
