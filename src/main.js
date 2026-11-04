import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css'
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';


// Root entry point for the Vue application. This file creates the app
// instance, registers the Pinia store and the router, and mounts the
// application to the DOM element defined in index.html.
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

// Métricas de Vercel sin cookies: visitas (Web Analytics) y rendimiento real (Speed Insights).
inject();
injectSpeedInsights();
