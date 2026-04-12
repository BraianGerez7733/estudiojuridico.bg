<template>
  <div class="carousel-container">
    <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div 
        class="carousel-slide" 
        v-for="(image, index) in images" 
        :key="index"
      >
        <img :src="image.src" :alt="image.alt" class="carousel-image" />
        <div class="carousel-caption" v-if="image.caption">
          <h3>{{ image.caption.title }}</h3>
          <p>{{ image.caption.text }}</p>
        </div>
      </div>
    </div>

    <!-- Controles -->
    <button class="carousel-btn prev" @click="prevSlide" aria-label="Anterior">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button class="carousel-btn next" @click="nextSlide" aria-label="Siguiente">
      <i class="fas fa-chevron-right"></i>
    </button>

    <!-- Indicadores -->
    <div class="carousel-indicators">
      <span 
        v-for="(_, index) in images" 
        :key="index"
        :class="['indicator', { active: currentIndex === index }]"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const images = [
  { 
    src: '/assets/carousel_1.png', 
    alt: 'Oficina de reuniones',
    caption: { title: 'Asesoramiento Integral', text: 'Atención personalizada en un entorno profesional.' } 
  },
  { 
    src: '/assets/carousel_2.png', 
    alt: 'Balanza de la justicia',
    caption: { title: 'Defendemos tus derechos', text: 'Especialistas en accidentes laborales y ART.' } 
  },
  { 
    src: '/assets/carousel_3.png', 
    alt: 'Escritorio con documentos',
    caption: { title: 'Experiencia y Compromiso', text: 'Te acompañamos en cada etapa del proceso.' } 
  }
];

const currentIndex = ref(0);
let autoPlayInterval = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoPlay = () => {
  autoPlayInterval = setInterval(nextSlide, 5000); // 5 segundos
};

const stopAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 480px;
  margin: 0 auto 40px;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 20px 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  text-align: center;
}

.carousel-caption h3 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: var(--primary-color, #f7c70a);
  text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
}

.carousel-caption p {
  font-size: 1.1rem;
  margin: 0;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  z-index: 10;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  color: var(--dark-color, #222);
}

.carousel-btn.prev {
  left: 20px;
}

.carousel-btn.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--primary-color, #f7c70a);
  width: 24px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .carousel-container {
    height: 300px;
    border-radius: 8px;
  }
  
  .carousel-caption h3 {
    font-size: 1.3rem;
  }
  
  .carousel-caption p {
    font-size: 0.9rem;
  }
}
</style>
