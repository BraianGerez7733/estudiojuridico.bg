<template>
  <div class="recursos-page">
    <div class="header-banner">
      <!-- 🤫 Doble clic aquí para abrir el panel secreto para subir imágenes -->
      <h1 @dblclick="openSecretUpload" title="Doble clic para admin" style="user-select: none;">Muro de Recursos</h1>
      <p>Material, guías visuales y documentos legales selectos para nuestros clientes.</p>
    </div>

    <!-- Panel de carga (Solo visible para el admin) -->
    <div v-if="isAdmin" class="admin-panel">
      <h3>Panel de Admin: Subir al Muro</h3>
      <input type="text" v-model="newTitle" placeholder="Título de la imagen" class="admin-input" />
      <input type="file" @change="handleFileUpload" accept="image/*" class="admin-input" />
      <button :disabled="uploading" @click="uploadImage" class="admin-btn">
        <i class="fas" :class="uploading ? 'fa-spinner fa-spin' : 'fa-upload'"></i> 
        {{ uploading ? 'Subiendo...' : 'Publicar en el Muro' }}
      </button>
      <button @click="isAdmin = false" class="admin-btn cancel">Cerrar</button>
    </div>

    <div class="masonry-container">
      
      <!-- Imágenes Dinámicas cargadas de Supabase -->
      <div v-for="img in dynamicImages" :key="img.id" class="masonry-item highlight">
        <img :src="img.image_data" :alt="img.title" class="resource-img" />
        <div class="resource-info">
          <h3>{{ img.title }}</h3>
          <button @click="deleteImage(img.id)" v-if="isAdmin" class="delete-btn"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>

      <!-- Item 1: La imagen provista (Estático) -->
      <div class="masonry-item highlight">
        <img src="/assets/camino-juicios.png" alt="El camino de los juicios" class="resource-img" />
        <div class="resource-info">
          <h3>El Camino de los Juicios</h3>
          <p>Conceptualización visual sobre los pasos fundamentales en un proceso judicial.</p>
          <a href="/assets/camino-juicios.png" download class="download-btn"><i class="fas fa-download"></i> Descargar</a>
        </div>
      </div>

      <!-- Item 2: El Decálogo del Abogado -->
      <div class="masonry-item highlight">
        <img src="/assets/decalogo-abogado.jpg" alt="Decálogo del Abogado" class="resource-img" />
        <div class="resource-info">
          <h3>Decálogo del Abogado</h3>
          <p>Los 10 mandamientos éticos y morales planteados por Eduardo Couture para el ejercicio del derecho.</p>
          <a href="/assets/decalogo-abogado.jpg" download class="download-btn"><i class="fas fa-download"></i> Descargar</a>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabase';

const dynamicImages = ref([]);
const isAdmin = ref(false);
const newTitle = ref('');
const newImageData = ref('');
const uploading = ref(false);

const openSecretUpload = () => {
  const secret = prompt('Clave de administrador para subir imágenes:');
  if (secret === 'braian123') { // CONTRASEÑA SECRETA
    isAdmin.value = true;
  } else if (secret !== null) {
    alert('Clave incorrecta');
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    newImageData.value = e.target.result; // Base64 string
  };
  reader.readAsDataURL(file);
};

const fetchImages = async () => {
  const { data, error } = await supabase
    .from('image_wall')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (!error && data) {
    dynamicImages.value = data;
  }
};

const uploadImage = async () => {
  if (!newImageData.value || !newTitle.value) {
    alert('Por favor agrega un título y selecciona una imagen.');
    return;
  }
  
  uploading.value = true;
  const { error } = await supabase
    .from('image_wall')
    .insert([{ title: newTitle.value, image_data: newImageData.value }]);
  
  uploading.value = false;

  if (error) {
    console.error(error);
    alert('Asegúrate de haber creado la tabla `image_wall` en Supabase con las columnas `title` (text) e `image_data` (text).');
  } else {
    newTitle.value = '';
    newImageData.value = '';
    isAdmin.value = false;
    fetchImages(); // Refrescar muro
  }
};

const deleteImage = async (id) => {
  if(confirm('¿Eliminar esta imagen del muro?')){
    await supabase.from('image_wall').delete().eq('id', id);
    fetchImages();
  }
};

onMounted(() => {
  fetchImages();
});
</script>

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
  cursor: pointer;
}

.header-banner p {
  font-size: 1.1rem;
  color: #718096;
}

/* Panel Admin */
.admin-panel {
  max-width: 500px;
  margin: 0 auto 40px auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 2px dashed #f7c70a;
}

.admin-panel h3 {
  margin-top: 0;
  color: #2d3748;
}

.admin-input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
}

.admin-btn {
  background-color: #25d366;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-right: 10px;
}

.admin-btn.cancel {
  background-color: #e53e3e;
}

/* Fin Panel Admin */

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

.delete-btn {
  background-color: #e53e3e;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c53030;
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
