<template>
  <section class="hero">
    <video class="hero-video-background" autoplay muted playsinline>
          <source src="/assets/Balanza_de_fondo.mp4" type="video/mp4">
                Tu navegador no soporta el tag de video.
                    </video>
                      <div class="overlay"></div>
                        <div class="hero-diagonal-1"></div>
                          <div class="hero-diagonal-2"></div>
                            <div class="hero-title-box">
                              <h1 class="hero-main-title">ESTUDIO JURÍDICO</h1>
                                <h2 class="hero-sub-title">Braian Geréz</h2>
                                  </div>
                                  </section>
                                  </template>
                                  
                                  <script setup>
                                  
                                  </script>

                                  <style scoped>
                                  .hero {
                                      position: relative;
                                         background-size: cover;
                                           background-position: center;
                                             color: var(--light-color);
                                               min-height: 70vh;
                                                 display: flex;
                                                   align-items: center;
                                                     justify-content: center;
                                                       text-align: center;
                                                         padding: 40px 20px;
                                  }
                                  
                                  .cta-button:hover {
                                      filter: brightness(0.9);
                                  }

                                  .hero-title-box {
                                      position: absolute;
                                        z-index: 5;
                                          text-align: center;
                                            color: white;
                                              top: 50%;
                                                left: 50%;
                                                  transform: translate(-50%, -50%);
                                                    font-family: Georgia, 'Times New Roman', Times, serif;
                                  }

                                  .hero-main-title {
                                      font-size: 3.5rem;
                                        font-weight: 800;
                                          margin: 0;
                                  }

                                  .hero-sub-title {
                                      font-size: 2rem;
                                        margin-top: 10px;
                                  }
                                  /* 🌟 NUEVO ESTILO PARA EL VIDEO DE FONDO 🌟 */
                                  .hero-video-background {
                                      position: absolute; /* Permite posicionarlo con precisión */
                                        top: 0;
                                          left: 0;
                                            width: 100%; /* Cubre todo el ancho del contenedor .hero */
                                              height: 100%; /* Cubre toda la altura del contenedor .hero */
                                                object-fit: cover; /* Asegura que el video cubra sin distorsionarse */
                                                  z-index: 1; /* Debe estar bajo el overlay (z-index: 2) y el título (z-index: 3) */
                                  }

                                  /* Es importante que el overlay tenga z-index: 2 para que se vea la sombra sobre el video */
                                  .overlay {
                                      position: absolute;
                                        top: 0;
                                          left: 0;
                                            right: 0;
                                              bottom: 0;
                                                background: rgba(0, 0, 0, 0.5);
                                                  z-index: 2; /* Asegúrese de que este valor sea mayor al del video (1) */
                                  }
                                  /* Diagonales unidas en el centro inferior (forma de V simétrica) */
                                  .hero-diagonal-1,
                                  .hero-diagonal-2 {
                                      position: absolute;
                                        bottom: 0;
                                          left: 0;
                                            width: 100%;
                                              height: 35vh; /* Altura igual para simetría */
                                                background: white;
                                                  z-index: 3; /* Por encima del overlay para que se vea bien */
                                  }

                                  /* Diagonal izquierda */
                                  .hero-diagonal-1 {
                                      clip-path: polygon(0 0, 30% 100%, 0 100%);
                                  }

                                  /* Diagonal derecha */
                                  .hero-diagonal-2 {
                                      clip-path: polygon(100% 0, 30% 100%, 100% 100%);
                                  }
                                  @media (max-width: 768px) {
                                      .hero-diagonal-1,
                                        .hero-diagonal-2 {
                                              height: 20vh; /* Baja de 35vh a 20vh o prueba 15-25vh según tu gusto */
                                        }
                                        }
                                        </style scoped>