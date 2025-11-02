<template>
  <section class="dashboard hero-presentation">
    <div class="overlay"></div>
    <div class="content">
      <h1>Defendemos tus derechos laborales</h1>
      <p>
        Hola, gracias por visitar mi sitio web, espero le sea de agrado. Mi nombre es <strong>Braian Geréz</strong>,
        me especializo en defender los derechos de los trabajadores accidentados o con enfermedades profesionales.
        Por el momento solo trabajo en la ciudad de Río Grande. Brindo atención personalizada, asistencia a todas
        las audiencias. Realizo mi trabajo con pasión, a gran velocidad para la realización de los escritos y presentaciones,
        y con tecnología de última generación.
      </p>
      <p>
        Para conocernos más por favor siga los enlaces cuidadosamente preparados para usted.
      </p>
    </div>
  </section>
</template>

<script setup>
// no necesita lógica
</script>

<style scoped>
.hero-presentation {
  position: relative;
  background: url('/img/fondo-justicia.jpg') center/cover no-repeat; /* reemplaza por tu imagen */
  color: #fff;
  text-align: center;
  padding: 100px 20px;
  min-height: 500px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}
h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #f7c70a;
  margin-bottom: 20px;
}
p {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
