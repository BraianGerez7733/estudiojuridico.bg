<template>
  <section class="section" v-if="article">
    <h1 class="article-title">{{ article.titulo }}</h1>
    <p class="article-meta">{{ formattedDate }} · {{ article.autor }}</p>
    <div class="article-content" v-html="article.contenido"></div>
    <div class="article-tags">
      <span v-for="tag in article.palabras_clave" :key="tag" class="tag">#{{ tag }}</span>
    </div>
  </section>
  <section class="section" v-else>
    <p>Artículo no encontrado.</p>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticlesStore } from '@/stores/articles';

const route = useRoute();
const store = useArticlesStore();

const slug = computed(() => route.params.slug);
const article = computed(() => store.getArticleBySlug(slug.value));

const formattedDate = computed(() => {
  if (!article.value) return '';
  const date = new Date(article.value.fecha);
  return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
});

onMounted(() => {
  if (!store.articles.length) {
    store.fetchArticles();
  }
});
</script>

<style scoped>
.section {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}
.article-title {
  margin-bottom: 8px;
  font-size: 2.2rem;
  color: var(--secondary-color);
}
.article-meta {
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: #666;
}
.article-content {
  line-height: 1.6;
  color: var(--dark-color);
}
.article-tags {
  margin-top: 24px;
}
.tag {
  display: inline-block;
  margin-right: 8px;
  padding: 4px 8px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border-radius: 4px;
  font-size: 0.8rem;
}
</style>