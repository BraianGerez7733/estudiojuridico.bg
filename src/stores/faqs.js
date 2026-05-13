import { defineStore } from 'pinia';

export const useFaqStore = defineStore('faqs', {
  state: () => ({
    faqs: []
  }),
  actions: {
    loadFaqs() {
      this.faqs = [
        {
          id: 1,
          categoria: 'General',
          pregunta: '¿Qué es la ART?',
          respuesta:
            'La Aseguradora de Riesgos del Trabajo (ART) es la aseguradora que debe cubrir los accidentes y enfermedades laborales; está obligada a brindar atención médica, pagar salarios durante la baja y determinar la incapacidad.',
          linkSRT: 'https://www.srt.gob.ar/arg/art_busqueda_art-08.php'
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
        },
        {
          id: 6,
          categoria: 'Accidentes',
          pregunta: '¿El número de siniestro que me dieron es el número completo?',
          respuesta:
            'Habitualmente, el número que se informa al trabajador en comunicaciones, constancias o altas médicas funciona como una referencia abreviada del siniestro. Generalmente se informan únicamente los primeros siete (7) números para facilitar su identificación y evitar una numeración extensa. El número administrativo completo puede contener más dígitos y ser utilizado por la ART en sus registros internos o actuaciones administrativas.'
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