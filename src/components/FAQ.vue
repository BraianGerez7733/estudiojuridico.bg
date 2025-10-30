<template>
  <div class="faq-wrapper">
    <div class="faq-filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar..."
        class="faq-search"
      />
      <select v-model="selectedCategory" class="faq-select">
        <option value="">Todas las categorías</option>
        <option
          v-for="cat in categories"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>
    </div>
    <div class="faq-list">
      <div v-for="faq in filteredFaqs" :key="faq.id" class="faq-card">
        <h3>{{ faq.pregunta }}</h3>
        <p v-html="faq.respuesta"></p>
        <button class="faq-button" @click="openWhatsApp">Consultar ahora</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFaqStore } from '@/stores/faqs';

const faqStore = useFaqStore();
const searchQuery = ref('');
const selectedCategory = ref('');

const categories = computed(() => faqStore.categories);

const filteredFaqs = computed(() => {
  let faqs = faqStore.faqs;
  if (selectedCategory.value) {
    faqs = faqs.filter((f) => f.categoria === selectedCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    faqs = faqs.filter(
      (f) =>
        f.pregunta.toLowerCase().includes(q) ||
        f.respuesta.toLowerCase().includes(q)
    );
  }
  return faqs;
});

function openWhatsApp() {
  window.open('https://wa.me/5492964000000', '_blank');
}

onMounted(() => {
  if (!faqStore.faqs.length) {
    faqStore.loadFaqs();
  }
});
</script>

<style scoped>
.faq-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.faq-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.faq-search {
  flex: 1;
  padding: 8px 12px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.faq-select {
  padding: 8px 12px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.faq-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.faq-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.faq-card h3 {
  margin: 0 0 12px;
  font-size: 1.2rem;
  color: var(--secondary-color);
}
.faq-card p {
  flex-grow: 1;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 16px;
}
.faq-button {
  align-self: flex-start;
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: filter 0.3s;
}
.faq-button:hover {
  filter: brightness(0.9);
}
</style>