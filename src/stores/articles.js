import { defineStore } from 'pinia';

/**
 * Store para administrar artículos del blog. Los artículos se cargan desde
 * public/data/articles.json y se presentan con filtros y buscador.
 */
export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: []
  }),
  actions: {
    async fetchArticles() {
      try {
        const response = await fetch('/data/articles.json');
        this.articles = await response.json();
      } catch (e) {
        console.error('Error al cargar artículos:', e);
      }
    }
  },
  getters: {
    categories: (state) => {
      const cats = state.articles.map((a) => a.categoria);
      return [...new Set(cats)];
    },
    getArticleBySlug: (state) => {
      return (slug) => state.articles.find((a) => a.slug === slug);
    }
  }
});