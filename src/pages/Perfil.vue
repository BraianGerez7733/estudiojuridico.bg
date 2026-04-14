<template>
  <div class="perfil-section fade-in">
    <div class="perfil-container">
      <div class="perfil-foto-wrapper">
        <img src="https://via.placeholder.com/300x300?text=Tu+Foto" alt="Dr. Braian Geréz" class="perfil-foto">
      </div>
      <div class="perfil-info">
        <h1>Dr. Braian Geréz</h1>
        <h2>Abogado Especialista en Accidentes Laborales</h2>
        <p>
          [Aquí puedes escribir tu historia y experiencia profesional. Puedes comenzar redactando dónde te formaste y los motivos por los que decidiste especializarte en derecho laboral.]
        </p>
        <p>
          [Este espacio está especialmente diseñado para que cuentes tus valores y tu compromiso con los trabajadores de Tierra del Fuego. ¡Edita este texto cuando quieras agregando tu toque personal!]
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
}
.perfil-foto {
  width: 100%;
  max-width: 250px;
  aspect-ratio: 1;
  object-fit: cover;
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
}
@media (max-width: 768px) {
  .perfil-container {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 20px;
  }
}
</style>
