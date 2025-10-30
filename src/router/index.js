import { createRouter, createWebHistory } from 'vue-router';

// Lazy load page components to enable code‑splitting. Each route
// corresponds to a top‑level view. Dynamic imports automatically
// create separate chunks during the build process.
const Home = () => import('@/pages/Home.vue');
const Services = () => import('@/pages/Services.vue');
const Service = () => import('@/pages/Service.vue');
const FAQs = () => import('@/pages/FAQs.vue');
const Articles = () => import('@/pages/Articles.vue');
const Article = () => import('@/pages/Article.vue');
const Apps = () => import('@/pages/Apps.vue');
const Contact = () => import('@/pages/Contact.vue');
const Where = () => import('@/pages/Where.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/servicios', name: 'Servicios', component: Services },
  { path: '/servicios/:slug', name: 'ServicioDetalle', component: Service, props: true },
  { path: '/faqs', name: 'FAQs', component: FAQs },
  { path: '/articulos', name: 'Articulos', component: Articles },
  { path: '/articulos/:slug', name: 'ArticuloDetalle', component: Article, props: true },
  { path: '/aplicaciones', name: 'Aplicaciones', component: Apps },
  { path: '/contacto', name: 'Contacto', component: Contact },
  { path: '/donde-estamos', name: 'DondeEstamos', component: Where }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;