<template>
  <div class="video-grid">
    <div class="video-item" v-for="video in videos" :key="video.id">
      <iframe
        width="100%"
        height="200"
        :src="`https://www.youtube.com/embed/${video.id}`"
        title="Video educativo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <p class="video-title">{{ video.titulo }}</p>
    </div>
  </div>
</template>

<script setup>
// Videos educativos de YouTube. Cambiar IDs según contenido relevante.
const videos = [
  {
    id: '3cT6KQoOwY8',
    titulo: 'Derechos del trabajador en casos de accidente laboral'
  },
  {
    id: 'smbv7mdWjWY',
    titulo: 'Cómo proceder ante una enfermedad profesional'
  }
];
</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.video-title {
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--secondary-color);
}
</style>