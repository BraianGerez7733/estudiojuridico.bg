<template>
  <div class="testimonials">
    <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
      <div class="rating">
        <span v-for="n in 5" :key="n">
          <i
            :class="n <= testimonial.rating ? 'fas fa-star' : 'far fa-star'"
          ></i>
        </span>
      </div>
      <p class="comment">"{{ testimonial.comentario }}"</p>
      <p class="author">– {{ testimonial.nombre }}</p>
    </div>
  </div>
</template>

<script setup>
// Testimonios simulados. En un sitio real podrían provenir de una base de datos o API.
const testimonials = [
  {
    nombre: 'M.P.',
    rating: 5,
    comentario:
      'Excelente atención y resultado. Lograron que la ART cubriera todos mis gastos médicos y me indemnizaran adecuadamente.'
  },
  {
    nombre: 'J.L.',
    rating: 4,
    comentario:
      'Muy profesionales y cercanos. Me acompañaron durante todo el proceso y resolvieron mi reclamo con rapidez.'
  },
  {
    nombre: 'C.R.',
    rating: 5,
    comentario:
      'Se ocuparon de mi caso de enfermedad profesional y obtuve una compensación justa. Los recomiendo.'
  }
];
</script>

<style scoped>
.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.testimonial-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
.rating {
  margin-bottom: 12px;
  color: var(--primary-color);
}
.comment {
  font-size: 0.9rem;
  margin-bottom: 8px;
  color: #555;
}
.author {
  font-size: 0.8rem;
  color: #888;
}
</style>