<template>
  <div class="articles-wrapper">
    <div class="articles-filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar artículos..."
        class="articles-search"
      />
      <select v-model="selectedCategory" class="articles-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>
    <div class="articles-list">
      <div v-for="article in filteredArticles" :key="article.id" class="article-card">
        <h3 class="article-title">{{ article.titulo }}</h3>
        <p class="article-meta">{{ formatDate(article.fecha) }} · {{ article.autor }}</p>
        <p class="article-description">{{ article.descripcion }}</p>
        <router-link :to="`/articulos/${article.slug}`" class="read-more"
          >Leer más</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useArticlesStore } from '@/stores/articles';

const articleStore = useArticlesStore();
const searchQuery = ref('');
const selectedCategory = ref('');

const categories = computed(() => articleStore.categories);

const filteredArticles = computed(() => {
  let list = articleStore.articles;
  if (selectedCategory.value) {
    list = list.filter((a) => a.categoria === selectedCategory.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(
      (a) =>
        a.titulo.toLowerCase().includes(q) ||
        a.descripcion.toLowerCase().includes(q) ||
        a.contenido.toLowerCase().includes(q)
    );
  }
  return list;
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
}

onMounted(() => {
  if (!articleStore.articles.length) {
    articleStore.fetchArticles();
  }
});
</script>

<style scoped>
.articles-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.articles-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.articles-search {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}
.articles-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}
.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.article-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.article-title {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: var(--secondary-color);
}
.article-meta {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 12px;
}
.article-description {
  flex-grow: 1;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 16px;
}
.read-more {
  align-self: flex-start;
  padding: 6px 12px;
  background-color: var(--secondary-color);
  color: var(--light-color);
  border-radius: 4px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background-color 0.3s;
}
.read-more:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>