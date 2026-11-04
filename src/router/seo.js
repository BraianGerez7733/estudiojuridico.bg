// SEO por ruta: título, descripción, canonical, Open Graph y robots.
// Textos informativos: sin prometer resultados (regla ética de publicidad de abogados).

export const SITE_URL = 'https://estudiojuridicobg.vercel.app';
const SITE_NAME = 'Estudio Jurídico Dr. Braian Geréz';
const DEFAULT_DESCRIPTION =
  'Abogado laboralista en Río Grande, Tierra del Fuego. Asesoramiento en accidentes de trabajo, enfermedades profesionales y reclamos ante la ART.';

// noindex: páginas en construcción o de uso interno (sacarlo cuando tengan contenido).
export const routeSeo = {
  Home: {
    title: `${SITE_NAME} | Accidentes de trabajo en Río Grande`,
    description: DEFAULT_DESCRIPTION
  },
  Servicios: {
    title: 'Servicios',
    description:
      'Accidentes de trabajo, enfermedades profesionales, trámites ante la ART y la Comisión Médica, medidas cautelares y demandas laborales en Tierra del Fuego.'
  },
  FAQs: {
    title: 'Preguntas frecuentes sobre ART y accidentes de trabajo',
    description:
      'Respuestas generales sobre la denuncia, la ART, la Comisión Médica y los plazos. Cada caso requiere un análisis particular.'
  },
  Articulos: {
    title: 'Artículos sobre riesgos del trabajo',
    description:
      'Notas informativas sobre accidentes laborales, enfermedades profesionales y los trámites ante la ART y la SRT.'
  },
  Aplicaciones: {
    title: 'Aplicaciones útiles',
    description:
      'Herramientas orientativas, como una calculadora estimativa de indemnización. Sus resultados no reemplazan el asesoramiento profesional.'
  },
  Contacto: {
    title: 'Contacto',
    description:
      'Contanos tu consulta por WhatsApp o por correo electrónico. Estudio en Don Bosco 715, Río Grande, Tierra del Fuego.'
  },
  DondeEstamos: {
    title: '¿Dónde estamos?',
    description:
      'Don Bosco 715, Río Grande, Tierra del Fuego. Atención de lunes a viernes de 9 a 17 h.'
  },
  Veredicta: { title: 'Modelos jurídicos', description: DEFAULT_DESCRIPTION, noindex: true },
  Almanaque: { title: 'Calendario', description: DEFAULT_DESCRIPTION, noindex: true },
  Recursos: {
    title: 'Muro de recursos',
    description: 'Material informativo, guías visuales y documentos sobre derecho laboral y riesgos del trabajo.'
  },
  Perfil: {
    title: 'Dr. Braian Geréz, abogado',
    description:
      'Conocé al Dr. Braian Geréz, abogado laboralista en Río Grande, Tierra del Fuego, dedicado a accidentes de trabajo y enfermedades profesionales.'
  },
  Herramientas: { title: 'Centro de recursos', description: DEFAULT_DESCRIPTION, noindex: true },
  Hechos: {
    title: '1. El hecho: el accidente o la enfermedad',
    description: 'Primera etapa: se produce el accidente o se detecta la enfermedad profesional.',
    noindex: true
  },
  SRT: {
    title: '2. SRT y Comisión Médica',
    description: 'Segunda etapa: el trámite ante la Comisión Médica de la Superintendencia de Riesgos del Trabajo.',
    noindex: true
  },
  Impugnacion: {
    title: '3. Impugnación del dictamen',
    description: 'Tercera etapa: qué se puede hacer si no se está de acuerdo con el dictamen de la Comisión Médica.',
    noindex: true
  },
  ViaJudicial: {
    title: '4. Vía judicial',
    description: 'Cuarta etapa: el reclamo ante la justicia del trabajo de Tierra del Fuego.',
    noindex: true
  },
  Privacidad: {
    title: 'Política de privacidad',
    description:
      'Cómo trata el estudio los datos personales que se envían por el formulario de contacto (Ley 25.326).'
  },
  // La 404 pone su propio noindex (NotFound.vue).
  NotFound: { title: 'Página no encontrada', description: DEFAULT_DESCRIPTION }
};

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySeo({ title, description, path, noindex }) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = SITE_URL + (path === '/' ? '/' : path.replace(/\/+$/, ''));
  document.title = fullTitle;
  setMeta('name', 'description', description);
  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', description);
  setCanonical(url);
  // El robots de la 404 lo maneja NotFound.vue; acá sólo el de las páginas marcadas.
  let robots = document.head.querySelector('meta[name="robots"][data-seo]');
  if (noindex) {
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      robots.setAttribute('data-seo', '');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex');
  } else if (robots) {
    robots.remove();
  }
}

// Páginas de detalle: toma título y descripción del JSON público.
const cache = {};
async function loadJson(name) {
  if (!cache[name]) {
    cache[name] = fetch(`/data/${name}.json`).then((r) => (r.ok ? r.json() : []));
  }
  return cache[name];
}

export async function seoForRoute(to) {
  const base = routeSeo[to.name] || { title: SITE_NAME, description: DEFAULT_DESCRIPTION };
  applySeo({ ...base, path: to.path });

  if (to.name === 'ServicioDetalle' || to.name === 'ArticuloDetalle') {
    const isService = to.name === 'ServicioDetalle';
    try {
      const list = await loadJson(isService ? 'services' : 'articles');
      const item = list.find((x) => x.slug === to.params.slug);
      if (window.location.pathname !== to.path) return; // ya se navegó a otra página
      if (item) {
        applySeo({
          title: isService ? item.nombre : item.titulo,
          description: item.descripcion || DEFAULT_DESCRIPTION,
          path: to.path
        });
      } else {
        applySeo({ ...routeSeo.NotFound, noindex: true, path: to.path });
      }
    } catch {
      /* si falla la carga queda el SEO genérico */
    }
  }
}
