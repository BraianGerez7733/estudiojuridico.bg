<template>
  <section class="notfound">
    <p class="code" aria-hidden="true">404</p>
    <h1>No encontramos esta página</h1>
    <p>Es posible que el enlace esté mal escrito o que la página ya no exista.</p>
    <div class="actions">
      <router-link to="/" class="btn btn-primary">Ir al inicio</router-link>
      <a
        href="https://wa.me/5492964540752"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-whatsapp"
        aria-label="Escribirnos por WhatsApp (se abre en una pestaña nueva)"
      ><i class="fab fa-whatsapp" aria-hidden="true"></i> Escribinos por WhatsApp</a>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

// Evita que los buscadores indexen las URL inexistentes.
let robots;
onMounted(() => {
  robots = document.createElement('meta');
  robots.name = 'robots';
  robots.content = 'noindex';
  document.head.appendChild(robots);
});
onBeforeUnmount(() => {
  if (robots) robots.remove();
});
</script>

<style scoped>
.notfound {
  max-width: 640px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
}
.code {
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
}
h1 {
  font-size: 1.6rem;
  margin: 8px 0 12px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}
.btn {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
}
.btn-primary {
  background: var(--primary-color);
  color: var(--secondary-color);
}
.btn-whatsapp {
  background: #25d366;
  color: #fff;
}
</style>
