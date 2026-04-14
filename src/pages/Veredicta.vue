<template>
  <div v-if="!isAuthenticated" class="login-screen">
    <div class="login-box">
      <div class="logo-container" style="justify-content: center; margin-bottom: 24px;">
        <i class="fas fa-layer-group logo-icon"></i>
        <span class="logo-text">Veredicta Admin</span>
      </div>
      <p>Acceso restringido al panel privado.</p>
      <input type="password" v-model="passwordInput" placeholder="Contraseña de administrador" class="login-input" @keyup.enter="login" />
      <button @click="login" class="login-btn">Ingresar</button>
      <p v-if="authError" class="error-msg">Contraseña incorrecta.</p>
    </div>
  </div>

  <div v-else class="veredicta-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-container">
          <i class="fas fa-layer-group logo-icon"></i>
          <span class="logo-text">Veredicta</span>
        </div>
      </div>
      
      <div class="workspace-selector">
        <div class="workspace-avatar">ME</div>
        <div class="workspace-info" style="cursor: default;">
          <span class="workspace-name">Mi espacio</span>
          <span class="workspace-role">Espacio de trabajo</span>
        </div>
        <i class="fas fa-sign-out-alt" @click="logout" title="Cerrar sesión" style="cursor: pointer;"></i>
      </div>
      
      <nav class="sidebar-nav">
        <a href="#" class="nav-item"><i class="fas fa-home"></i> Inicio</a>
        <a href="#" class="nav-item"><i class="fas fa-folder-open"></i> Expedientes</a>
        <a href="#" class="nav-item"><i class="fas fa-columns"></i> Vista General</a>
        <a href="#" class="nav-item"><i class="fas fa-tasks"></i> Tareas</a>
        <a href="#" class="nav-item"><i class="fas fa-wrench"></i> Herramientas</a>
        <a href="#" class="nav-item"><i class="fas fa-balance-scale"></i> Jurisprudencia</a>
        <a href="#" class="nav-item active"><i class="fas fa-file-contract"></i> Modelos jurídicos</a>
        <a href="#" class="nav-item has-sub"><i class="fas fa-cog"></i> Configuraciones <i class="fas fa-chevron-right arrow-right"></i></a>
      </nav>
    </aside>

    <main class="dashboard-main">
      <header class="main-header">
        <button class="icon-btn header-toggle"><i class="fas fa-outdent"></i></button>
        <div class="header-actions">
          <button class="icon-btn"><i class="far fa-bell"></i></button>
        </div>
      </header>
      
      <div class="content-container">
        <div class="content-header">
          <h1>Modelos Juridicos</h1>
          <p>Explore y utilice modelos jurídicos profesionales para demandas, contratos, poderes y otros documentos legales.</p>
        </div>

        <div class="development-card">
          <div class="icon-circle">
            <i class="fas fa-rocket rocket-icon"></i>
          </div>
          
          <div class="coming-soon-title">
            <h2>Proximamente</h2>
            <span class="badge">En desarrollo</span>
          </div>
          
          <p class="coming-soon-desc">
            Estamos trabajando en un buscador de modelos jurídicos para que puedas encontrar plantillas de escritos legales listas para usar directamente desde aquí.
          </p>
          
          <h3 class="features-title">Funcionalidades que vienen</h3>
          
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon-box search-color"><i class="fas fa-search"></i></div>
              <div class="feature-text">
                <h4>Búsqueda de modelos</h4>
                <p>Encuentra plantillas de escritos legales por tipo de documento y materia.</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon-box doc-color"><i class="fas fa-file-alt"></i></div>
              <div class="feature-text">
                <h4>Plantillas profesionales</h4>
                <p>Demandas, contestaciones, recursos, contratos y más, listos para usar.</p>
              </div>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon-box law-color"><i class="fas fa-book"></i></div>
              <div class="feature-text">
                <h4>Adaptados a normativa</h4>
                <p>Modelos actualizados según la normativa y jurisdicción argentina.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isAuthenticated = ref(false);
const passwordInput = ref('');
const authError = ref(false);

onMounted(() => {
  if (localStorage.getItem('veredicta_auth') === 'true') {
    isAuthenticated.value = true;
  }
});

const login = () => {
  if (passwordInput.value === 'braian123') { // CONTRASEÑA
    isAuthenticated.value = true;
    authError.value = false;
    localStorage.setItem('veredicta_auth', 'true');
  } else {
    authError.value = true;
  }
};

const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('veredicta_auth');
  passwordInput.value = '';
};
</script>

<style scoped>
.login-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f4f8;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.login-input {
  width: 100%;
  padding: 12px;
  margin: 20px 0 15px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background-color: #333;
}

.error-msg {
  color: #e53e3e;
  margin-top: 15px;
  font-size: 0.9rem;
}

.veredicta-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #fafbfc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
}

/* Sidebar */
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
  cursor: pointer;
  transition: background 0.2s;
}
.workspace-selector:hover { background-color: #f0f0f0; }

.workspace-avatar {
  width: 32px;
  height: 32px;
  background-color: #2d3748;
  color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
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

.workspace-selector .fa-chevron-down {
  font-size: 0.8rem;
  color: #999;
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

.has-sub {
  justify-content: space-between;
}
.has-sub i:first-child {
  margin-right: 12px;
}
.arrow-right {
  margin-left: auto;
  font-size: 0.75rem !important;
  color: #a0aec0 !important;
}

/* Main Content */
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
  justify-content: space-between;
  border-bottom: 1px solid #eaeaea;
  background-color: #ffffff;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #4a5568;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.icon-btn:hover { background-color: #f4f4f5; }

.content-container {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.content-header {
  margin-bottom: 32px;
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
}

/* Development Card */
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
  margin-bottom: 40px;
  font-size: 1rem;
}

.features-title {
  font-size: 1.15rem;
  color: #334155;
  margin-bottom: 24px;
  font-weight: 600;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  text-align: left;
  background-color: #fafbfc;
}

.feature-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
  background-color: #e2e8f0;
  color: #475569;
}

.feature-text h4 {
  font-size: 0.95rem;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  font-weight: 600;
}

.feature-text p {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .sidebar { width: 0; overflow: hidden; border: none; }
  .content-container { padding: 20px; }
  .development-card { padding: 30px 20px; }
}
</style>
