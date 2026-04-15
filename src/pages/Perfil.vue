<template>
  <div class="perfil-section fade-in">
    <div class="perfil-container">
      <div class="perfil-foto-wrapper">
        <img src="/assets/perfil-admin.jpg" alt="Dr. Braian Geréz" class="perfil-foto">
      </div>
      <div class="perfil-info">
        <h1>Dr. Braian Geréz</h1>
        <h2>Abogado Especialista en Accidentes Laborales</h2>
        <p>
          Soy abogado con más de 16 años de experiencia en el ejercicio de la profesión, habiéndome recibido en el año 2009, momento desde el cual inicié de manera ininterrumpida mi actividad en el ámbito jurídico.
        </p>
        <p>
          A lo largo de mi trayectoria, he desarrollado una sólida especialización en derecho laboral. En los últimos años, he orientado mi práctica de manera exclusiva a la atención de casos de accidentes de trabajo y enfermedades profesionales, enfocando mi labor en la defensa integral del trabajador frente a las Aseguradoras de Riesgos del Trabajo (ART).
        </p>
        <p>
          Mi forma de trabajo se distingue por una premisa fundamental: priorizar la salud del trabajador. Antes de cualquier reclamo indemnizatorio, considero esencial que la persona reciba el tratamiento médico adecuado y logre su recuperación en las mejores condiciones posibles. Recién a partir de allí, se evalúa y se impulsa el reclamo económico correspondiente, con el objetivo de obtener una reparación justa y acorde a derecho.
        </p>
        <p>
          Asimismo, acompaño personalmente a cada trabajador en todas las audiencias que deba afrontar, ya sea ante las Comisiones Médicas o en sede judicial, brindando respaldo profesional y seguridad en cada instancia del proceso.
        </p>
        <p>
          Brindo un acompañamiento cercano, técnico y comprometido en cada etapa, entendiendo que detrás de cada caso hay una persona que necesita respuestas claras, contención y una defensa firme de sus derechos.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.perfil-section {
  padding: 120px 20px 60px;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
}
.perfil-container {
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  align-items: start;
}
.perfil-foto-wrapper {
  text-align: center;
  padding-top: 24px;
}
.perfil-foto {
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
  border: 4px solid #f7c70a;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
.perfil-info h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #222;
}
.perfil-info h2 {
  font-size: 1.2rem;
  color: #f7c70a;
  margin-bottom: 20px;
  font-weight: 600;
}
.perfil-info p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
  text-align: justify;
}
@media (max-width: 768px) {
  .perfil-container {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 20px;
  }
}
</style>
