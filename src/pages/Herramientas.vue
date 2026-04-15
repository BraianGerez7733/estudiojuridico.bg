<template>
  <div class="veredicta-layout">
    <!-- Sidebar similar al estilo Veredicta -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-container">
          <i class="fas fa-toolbox logo-icon"></i>
          <span class="logo-text">Herramientas</span>
        </div>
      </div>
      
      <div class="workspace-selector" style="cursor: default;">
        <div class="workspace-avatar" style="background-color: var(--primary-color);">R</div>
        <div class="workspace-info">
          <span class="workspace-name">Recursos</span>
          <span class="workspace-role">Público</span>
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/" class="nav-item"><i class="fas fa-arrow-left"></i> Volver al Inicio</router-link>
        <a href="#" class="nav-item active"><i class="fas fa-star"></i> Novedades</a>
        <!-- Aquí el usuario instalará nuevas herramientas -->
        <a href="#" class="nav-item"><i class="fas fa-folder-plus"></i> Instalar herramienta</a>
      </nav>
    </aside>

    <!-- Área Principal -->
    <main class="dashboard-main">
      <header class="main-header">
        <button class="icon-btn header-toggle"><i class="fas fa-outdent"></i></button>
      </header>
      
      <div class="content-container">
        <div class="content-header">
          <h1>Centro de Recursos</h1>
          <p>Bienvenido al área de herramientas operativas de Estudio Jurídico BG.</p>
        </div>

        <div class="development-card">
          <div class="icon-circle">
            <i class="fas fa-tools rocket-icon"></i>
          </div>
          
          <div class="coming-soon-title">
            <h2>Área en construcción</h2>
            <span class="badge">Preparado</span>
          </div>
          
          <p class="coming-soon-desc">
            Esta es la nueva página en blanco para instalar futuras herramientas operativas al estilo Veredicta. Puedes comenzar a integrar tus componentes aquí cuando lo desees.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Configuración inicial de la página
});
</script>

<style scoped>
/* Heredaremos la estética que te gustó de Veredicta */
.veredicta-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #fafbfc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 24px 20px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 1.5rem;
  color: #1a1a1a;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.workspace-selector {
  margin: 0 16px 20px;
  padding: 12px;
  background-color: #f7f7f7;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.workspace-avatar {
  width: 32px;
  height: 32px;
  color: #1a202c;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin-right: 12px;
}

.workspace-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.workspace-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a1a;
}

.workspace-role {
  font-size: 0.75rem;
  color: #666;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: #4a5568;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.nav-item i {
  width: 20px;
  margin-right: 12px;
  font-size: 1.05rem;
  text-align: center;
  color: #718096;
}

.nav-item:hover {
  background-color: #f7f7f7;
  color: #1a1a1a;
}

.nav-item.active {
  background-color: #f4f4f5;
  color: #1a1a1a;
  font-weight: 600;
}
.nav-item.active i {
  color: #1a1a1a;
}

.dashboard-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.main-header {
  height: 60px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  background-color: #ffffff;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #4a5568;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-container {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.content-header h1 {
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-weight: 700;
}

.content-header p {
  color: #718096;
  font-size: 1rem;
  margin-bottom: 32px;
}

.development-card {
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

.icon-circle {
  width: 72px;
  height: 72px;
  background-color: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.rocket-icon {
  font-size: 2rem;
  color: #475569;
}

.coming-soon-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.coming-soon-title h2 {
  font-size: 1.6rem;
  color: #1a1a1a;
  margin: 0;
}
.badge {
  background-color: #eff6ff;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
}
.coming-soon-desc {
  max-width: 600px;
  color: #64748b;
  line-height: 1.6;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .sidebar { width: 0; overflow: hidden; border: none; }
  .content-container { padding: 20px; }
  .development-card { padding: 30px 20px; }
}
</style>
