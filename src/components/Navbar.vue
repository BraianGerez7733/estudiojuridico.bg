<template>
  <header class="navbar">
    <div class="container">
      <div class="brand-video-container">
        <router-link to="/">
          <video autoplay muted loop playsinline class="brand-video">
          <source src="/assets/Logo-3-[remix].mp4" type="video/mp4" />
          </video>
        </router-link>
      </div>

      <!-- Botón de menú hamburguesa para móviles -->
      <button class="hamburger-btn" @click="toggleMenu" aria-label="Menú">
        <i class="fas fa-bars"></i>
      </button>

      <nav class="nav" :class="{ 'menu-open': isMenuOpen }">
        <ul class="nav-list">
          <li><router-link to="/" @click="closeMenu">Inicio</router-link></li>
          <li class="dropdown">
            <span class="dropbtn">Servicios <i class="fas fa-caret-down"></i></span>
            <ul class="dropdown-menu">
              <li><router-link to="/servicios?categoria=accidentes" @click="closeMenu">Accidentes laborales</router-link></li>
              <li><router-link to="/servicios?categoria=enfermedades" @click="closeMenu">Enfermedades profesionales</router-link></li>
              <li><router-link to="/servicios?categoria=reclamo-art" @click="closeMenu">Reclamación a la ART</router-link></li>
              <li><router-link to="/servicios?categoria=recursos" @click="closeMenu">Recursos</router-link></li>
            </ul>
          </li>
          <li><router-link to="/faqs" @click="closeMenu">Preguntas</router-link></li>
          <li><router-link to="/articulos" @click="closeMenu">Artículos</router-link></li>
          <li><router-link to="/aplicaciones" @click="closeMenu">Aplicaciones</router-link></li>
          <li><router-link to="/almanaque" @click="closeMenu">Calendario</router-link></li>
          <li><router-link to="/contacto" @click="closeMenu">Contacto</router-link></li>
          <li><router-link to="/donde-estamos" @click="closeMenu">¿Dónde estamos?</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  const video = document.querySelector('.brand-video');
  if (video) {
    video.playbackRate = 0.8; // Velocidad al 60% (más lento)
  }
});
</script>
// modificamos la velocidad del video sin modificar el archivo original

<style scoped>
.navbar {
  background-color: var(--secondary-color);
  color: var(--light-color);
  padding: 12px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 9999;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.brand-link {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2;
}
.brand-link small {
  display: block;
  font-size: 0.8rem;
  color: var(--light-color);
}

.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-list li {
  position: relative;
}

.nav-list a,
.nav-list span {
  color: var(--light-color);
  text-decoration: none;
  font-size: 0.9rem;
  padding: 8px 4px;
  transition: color 0.2s;
  cursor: pointer;
}

.nav-list a:hover,
.nav-list span:hover {
  color: var(--primary-color);
}

/* Dropdown menu */
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--secondary-color);
  padding: 8px 0;
  list-style: none;
  min-width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.dropdown:hover > .dropdown-menu {
  display: block;
}
.dropdown-menu li {
  padding: 4px 16px;
}
.dropdown-menu li a {
  display: block;
  color: var(--light-color);
  font-size: 0.85rem;
  white-space: nowrap;
}
.dropdown-menu li a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .hamburger-btn {
    display: block;
    background: none;
    border: none;
    color: var(--light-color);
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--secondary-color);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .nav.menu-open {
    display: block;
  }

  .nav-list {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
    gap: 15px;
    display: flex;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    background-color: rgba(255,255,255,0.05);
    width: 100%;
    margin-top: 10px;
  }
}

@media (min-width: 769px) {
  .hamburger-btn {
    display: none;
  }
}

.brand-video-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}


.brand-video {
  width: 160px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}
.hero-video {
  background-color: transparent;
  border: none;
  outline: none;
}
</style>