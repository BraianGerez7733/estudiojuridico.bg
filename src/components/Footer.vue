<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-col">
        <h4>Servicios</h4>
        <ul>
          <li><router-link to="/servicios?categoria=accidentes">Accidentes laborales</router-link></li>
          <li><router-link to="/servicios?categoria=enfermedades">Enfermedades profesionales</router-link></li>
          <li><router-link to="/servicios?categoria=reclamo-art">Reclamo a la ART</router-link></li>
          <li><router-link to="/servicios?categoria=recursos">Recursos</router-link></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Recursos</h4>
        <ul>
          <li><router-link to="/faqs">Preguntas frecuentes</router-link></li>
          <li><router-link to="/articulos">Artículos legales</router-link></li>
          <li><router-link to="/aplicaciones">Aplicaciones web</router-link></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Institucional</h4>
        <ul>
          <li><router-link to="/">Nosotros</router-link></li>
          <li><router-link to="/">Equipo</router-link></li>
          <li><router-link to="/donde-estamos">¿Dónde estamos?</router-link></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Aplicaciones</h4>
        <ul>
          <li><router-link to="/aplicaciones">Calculadora de indemnización</router-link></li>
          <li><router-link to="/aplicaciones">Agendar consulta</router-link></li>
        </ul>
      </div>
      <div class="footer-col contact">
        <h4>Contacto</h4>
        <p>Don Bosco 715, Río Grande<br />
          Tierra del Fuego, Argentina</p>
        <p>Tel: +54 2964 000000</p>
        <p>Email: <a href="mailto:estudiojuridicobg.clientes@gmail.com">estudiojuridicobg.clientes@gmail.com</a></p>
        <div class="social-icons">
          <a href="https://wa.me/5492964000000" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          <a href="https://www.facebook.com/estudiojuridicobg" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
          <a href="https://www.instagram.com/estudiojuridicobg" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://twitter.com" target="_blank" aria-label="X"><i class="fab fa-x-twitter"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Estudio jurídico especializado en accidentes de trabajo y enfermedades profesionales en Río Grande, Tierra del Fuego, Argentina.</p>
      <div class="legal-links">
        <router-link to="/">Política de privacidad</router-link>
        <router-link to="/">Aviso legal</router-link>
        <router-link to="/">Cookies</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer doesn't require script logic.
</script>

<style scoped>
.footer {
  background-color: var(--secondary-color);
  color: var(--light-color);
  padding: 40px 20px;
}
.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.footer-col h4 {
  margin-bottom: 12px;
  color: var(--primary-color);
  font-size: 1.1rem;
}
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-col li {
  margin-bottom: 8px;
}
.footer-col a {
  color: var(--light-color);
  font-size: 0.85rem;
  transition: color 0.2s;
}
.footer-col a:hover {
  color: var(--primary-color);
}
.contact p {
  margin: 0 0 8px;
  font-size: 0.85rem;
}
.contact a {
  color: var(--primary-color);
}
.social-icons {
  margin-top: 8px;
}
.social-icons a {
  margin-right: 8px;
  color: var(--light-color);
  font-size: 1.2rem;
  transition: color 0.2s;
}
.social-icons a:hover {
  color: var(--primary-color);
}
.footer-bottom {
  margin-top: 24px;
  text-align: center;
  font-size: 0.8rem;
}
.legal-links {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 12px;
}
.legal-links a {
  color: var(--light-color);
  transition: color 0.2s;
}
.legal-links a:hover {
  color: var(--primary-color);
}
</style>