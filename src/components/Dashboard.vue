<template>
  <section class="dashboard-section">
    <div class="dashboard-header">
      <h2>Acceso a Recursos Legales</h2>
      <p>Enlaces directos a los principales organismos e instituciones judiciales de referencia.</p>
    </div>

    <div class="dashboard-grid">
      <!-- Tarjeta: CSJN -->
      <a href="https://www.csjn.gov.ar/" target="_blank" rel="noopener noreferrer" class="dash-card">
        <div class="card-icon csjn-icon">
          <i class="fas fa-university"></i>
        </div>
        <div class="card-content">
          <h3>CSJN</h3>
          <p>Corte Suprema de Justicia de la Nación. Jurisprudencia y resoluciones.</p>
        </div>
        <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
      </a>

      <!-- Tarjeta: Corte IDH -->
      <a href="https://www.corteidh.or.cr/" target="_blank" rel="noopener noreferrer" class="dash-card">
        <div class="card-icon idh-icon">
          <i class="fas fa-globe-americas"></i>
        </div>
        <div class="card-content">
          <h3>Corte IDH</h3>
          <p>Corte Interamericana de Derechos Humanos. Tratados y jurisprudencia internacional.</p>
        </div>
        <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
      </a>

      <!-- Tarjeta: TEDH -->
      <a href="https://www.echr.coe.int/" target="_blank" rel="noopener noreferrer" class="dash-card">
        <div class="card-icon tedh-icon">
          <i class="fas fa-balance-scale"></i>
        </div>
        <div class="card-content">
          <h3>TEDH</h3>
          <p>Tribunal Europeo de Derechos Humanos. Precedentes y derechos fundamentales.</p>
        </div>
        <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
      </a>

      <!-- Tarjeta: SRT (Sugerida) -->
      <a href="https://www.argentina.gob.ar/srt" target="_blank" rel="noopener noreferrer" class="dash-card highlight-card">
        <div class="card-icon srt-icon">
          <i class="fas fa-hard-hat"></i>
        </div>
        <div class="card-content">
          <h3>S.R.T.</h3>
          <p>Superintendencia de Riesgos del Trabajo. Trámites y comisiones médicas.</p>
        </div>
        <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
      </a>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.dashboard-section {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--font-family);
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h2 {
  font-size: 2.2rem;
  color: var(--secondary-color, #000);
  margin-bottom: 12px;
}

.dashboard-header p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.dash-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 24px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.dash-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.csjn-icon { background: #e3f2fd; color: #1976d2; }
.idh-icon { background: #e8f5e9; color: #388e3c; }
.tedh-icon { background: #fff3e0; color: #f57c00; }
.srt-icon { background: #fce4ec; color: #c2185b; }

.dash-card.highlight-card {
  border: 1px solid var(--primary-color, #f7c70a);
}

.card-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #222;
}

.card-content p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.card-arrow {
  position: absolute;
  bottom: 24px;
  right: 24px;
  font-size: 1.2rem;
  color: #aaa;
  transition: transform 0.3s ease, color 0.3s ease;
}

.dash-card:hover .card-arrow {
  transform: translateX(5px);
  color: var(--primary-color, #f7c70a);
}

@media (max-width: 768px) {
  .dashboard-section {
    padding: 40px 20px;
  }
  
  .dashboard-header h2 {
    font-size: 1.8rem;
  }
}
</style>
