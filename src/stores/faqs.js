import { defineStore } from 'pinia';

/**
 * Store para preguntas frecuentes. Incluye un conjunto de preguntas y
 * respuestas predefinidas sobre accidentes de trabajo y enfermedades
 * profesionales.
 */
export const useFaqStore = defineStore('faqs', {
  state: () => ({
    faqs: []
  }),
  actions: {
    loadFaqs() {
      // Se pueden cargar desde un archivo JSON o API. Aquí las definimos
      // directamente siguiendo las indicaciones del usuario.
      this.faqs = [
        {
          id: 1,
          categoria: 'General',
          pregunta: '¿Qué es la ART?',
          respuesta:
            'La Aseguradora de Riesgos del Trabajo (ART) es la aseguradora que debe cubrir los accidentes y enfermedades laborales; está obligada a brindar atención médica, pagar salarios durante la baja y determinar la incapacidad.'
        },
        {
          id: 2,
          categoria: 'Accidentes',
          pregunta: '¿Qué es un accidente “in itinere”?',
          respuesta:
            'Es el accidente que ocurre mientras vas o volvés del trabajo; la ART también debe cubrirlo.'
        },
        {
          id: 3,
          categoria: 'Enfermedades',
          pregunta: '¿Qué es una enfermedad profesional?',
          respuesta:
            'Son enfermedades causadas por el tipo de trabajo; para que la ART la cubra, hay que denunciarla correctamente y demostrar que es consecuencia directa de la actividad.'
        },
        {
          id: 4,
          categoria: 'Accidentes',
          pregunta: '¿Qué hacer si me accidento trabajando?',
          respuesta:
            'Informar al empleador, exigir derivación a la ART, pedir copia de la denuncia, guardar pruebas y contactar a un abogado.'
        },
        {
          id: 5,
          categoria: 'General',
          pregunta: '¿Cuánto tiempo tiene la ART para responder?',
          respuesta:
            'La ART debe expedirse sobre la aceptación o rechazo del siniestro en diez días hábiles desde la denuncia.'
        }
      ];
    }
  },
  getters: {
    categories: (state) => {
      const cats = state.faqs.map((f) => f.categoria);
      return [...new Set(cats)];
    }
  }
});