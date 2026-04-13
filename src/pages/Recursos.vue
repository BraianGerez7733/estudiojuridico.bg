<template>
  <div class="recursos-page">
    <div class="header-banner">
      <h1>Muro de Recursos</h1>
      <p>Material, guías visuales y documentos legales selectos para nuestros clientes.</p>
    </div>

    <div class="masonry-container">
      <!-- Item 1: La imagen provista -->
      <div class="masonry-item highlight">
        <img src="/assets/camino-juicios.png" alt="El camino de los juicios" class="resource-img" />
        <div class="resource-info">
          <h3>El Camino de los Juicios</h3>
          <p>Conceptualización visual sobre los pasos fundamentales en un proceso judicial estructural.</p>
          <a href="/assets/camino-juicios.png" download class="download-btn"><i class="fas fa-download"></i> Descargar</a>
        </div>
      </div>

      <!-- Item de relleno elegante -->
      <div class="masonry-item">
        <div class="resource-card text-card">
          <i class="fas fa-file-contract icon"></i>
          <h3>Guía de Trámites ART</h3>
          <p>Explicación detallada de qué hacer frente a un rechazo de Comisión Médica.</p>
          <button class="download-btn"><i class="fas fa-lock"></i> Próximamente</button>
        </div>
      </div>
      
      <!-- Item de relleno elegante -->
      <div class="masonry-item">
        <div class="resource-card text-card">
          <i class="fas fa-balance-scale icon"></i>
          <h3>Jurisprudencia Selecta</h3>
          <p>Colección de fallos que sientan precedente en materia de riesgos de trabajo.</p>
          <button class="download-btn"><i class="fas fa-lock"></i> Próximamente</button>
        </div>
      </div>

       <!-- Item de relleno elegante -->
       <div class="masonry-item">
        <div class="resource-card text-card">
          <i class="fas fa-chart-line icon"></i>
          <h3>Calculadora de Indemnizaciones</h3>
          <p>Fórmulas y parámetros legales vigentes dictados por la Superintendencia.</p>
          <button class="download-btn"><i class="fas fa-lock"></i> Próximamente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recursos-page {
  background-color: #f7fafc;
  min-height: 100vh;
  padding: 40px 20px;
}

.header-banner {
  text-align: center;
  margin-bottom: 50px;
}

.header-banner h1 {
  font-size: 2.8rem;
  color: var(--secondary-color, #2d3748);
  font-family: Georgia, serif;
  margin-bottom: 15px;
}

.header-banner p {
  font-size: 1.1rem;
  color: #718096;
}

.masonry-container {
  columns: 1;
  column-gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .masonry-container {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-container {
    columns: 3;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.06);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #edf2f7;
}

.masonry-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.resource-img {
  width: 100%;
  display: block;
  object-fit: contain;
  background-color: #ffffff;
  border-bottom: 1px solid #edf2f7;
  padding-top: 10px;
}

.resource-info {
  padding: 24px;
}

.resource-info h3 {
  font-size: 1.3rem;
  margin: 0 0 10px 0;
  color: #1a202c;
  font-weight: 700;
}

.resource-info p {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background-color: #2d3748;
  color: white;
  border-radius: 6px;
  border: none;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.2s;
  cursor: pointer;
}

.download-btn:hover {
  background-color: #1a202c;
}

.text-card {
  padding: 50px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  background: linear-gradient(135deg, #ffffff, #fdfdfd);
}

.icon {
  font-size: 3.5rem;
  color: var(--primary-color, #f7c70a);
  margin-bottom: 24px;
  filter: drop-shadow(0 4px 6px rgba(247, 199, 10, 0.3));
}

.text-card h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #2d3748;
  font-weight: 700;
}

.text-card p {
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 25px;
}
</style>
