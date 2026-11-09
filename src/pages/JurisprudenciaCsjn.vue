<template>
  <main class="juris-page">
    <router-link to="/herramientas" class="volver">← Volver a Herramientas</router-link>

    <h1>Jurisprudencia de la Corte Suprema por concepto</h1>
    <p class="intro">
      Escribí un concepto jurídico (por ejemplo «accidente de trabajo», «costas», «recurso de queja»)
      y se muestran los fallos de la Corte Suprema de Justicia de la Nación que lo tratan.
    </p>
    <p class="aviso">
      Es una búsqueda por concepto: indica dónde buscar. Antes de citar un fallo, leé su texto completo.
    </p>

    <label for="concepto" class="sr-only">Concepto jurídico</label>
    <input
      id="concepto"
      v-model="consulta"
      type="search"
      placeholder="Escribí un concepto…"
      autocomplete="off"
      class="buscar"
    />

    <p v-if="error" class="error">No se pudo cargar la base de fallos. Probá recargar la página.</p>
    <p v-else-if="!datos" class="estado">Cargando…</p>

    <template v-else>
      <div v-if="!consulta.trim()" class="sugerencias">
        <span class="etiqueta">Conceptos frecuentes:</span>
        <button v-for="c in sugeridos" :key="c" type="button" class="chip" @click="consulta = c">{{ c }}</button>
      </div>

      <section v-if="consulta.trim()">
        <h2 class="subtitulo">
          {{ resultados.length }} {{ resultados.length === 1 ? 'fallo' : 'fallos' }} para «{{ consulta.trim() }}»
        </h2>

        <p v-if="!resultados.length" class="estado">
          No hay fallos cargados para ese concepto. Probá con otra palabra.
        </p>

        <ul v-else class="lista">
          <li v-for="f in visibles" :key="f.id" class="fallo">
            <p class="cita">
              <strong>CSJN</strong>, autos «{{ f.k }}», {{ formatearFecha(f.d) }}<span v-if="f.f">, {{ f.f }}</span>.
            </p>
            <p v-if="f.r" class="resultado">Resultado: {{ f.r }}</p>
            <button type="button" class="abrir" @click="alternar(f.id)">
              {{ abierto === f.id ? 'Cerrar' : 'Leer ficha y fallo' }}
            </button>

            <div v-if="abierto === f.id" class="detalle">
              <p v-if="cargando" class="estado">Cargando…</p>
              <p v-else-if="errorDetalle" class="error">No se pudo cargar este fallo.</p>
              <template v-else-if="detalle">
                <h3>Ficha</h3>
                <p class="aviso-ficha">Ficha orientativa elaborada por el estudio. Lo que vale es el texto del fallo.</p>
                <pre class="texto">{{ detalle.ficha }}</pre>
                <button type="button" class="abrir" @click="verTexto = !verTexto">
                  {{ verTexto ? 'Ocultar fallo completo' : 'Ver fallo completo' }}
                </button>
                <pre v-if="verTexto" class="texto fallo-completo">{{ detalle.texto }}</pre>
              </template>
            </div>
          </li>
        </ul>
        <button v-if="resultados.length > limite" type="button" class="abrir mas" @click="limite += 30">
          Ver más fallos ({{ resultados.length - limite }} restantes)
        </button>
      </section>
    </template>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const datos = ref(null);
const error = ref(false);
const consulta = ref('');
const abierto = ref(null);
const detalle = ref(null);
const cargando = ref(false);
const errorDetalle = ref(false);
const verTexto = ref(false);
const limite = ref(30);

async function alternar(id) {
  if (abierto.value === id) { abierto.value = null; return; }
  abierto.value = id;
  detalle.value = null;
  verTexto.value = false;
  errorDetalle.value = false;
  cargando.value = true;
  try {
    const r = await fetch(`/data/csjn/${id}.json`);
    if (!r.ok) throw new Error(String(r.status));
    detalle.value = await r.json();
  } catch {
    errorDetalle.value = true;
  } finally {
    cargando.value = false;
  }
}

const sugeridos = [
  'accidente de trabajo',
  'recurso extraordinario federal',
  'arbitrariedad de sentencia',
  'costas',
  'recurso de queja',
  'reenvío',
];

onMounted(async () => {
  try {
    const r = await fetch('/data/csjn-conceptos.json');
    if (!r.ok) throw new Error(String(r.status));
    datos.value = await r.json();
  } catch {
    error.value = true;
  }
});

const normalizar = (t) =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

const resultados = computed(() => {
  if (!datos.value) return [];
  const q = normalizar(consulta.value);
  if (!q) return [];
  const ids = new Set();
  for (const [concepto, lista] of Object.entries(datos.value.conceptos)) {
    if (normalizar(concepto).includes(q)) lista.forEach((i) => ids.add(i));
  }
  return [...ids]
    .map((i) => ({ id: i, ...datos.value.fallos[i] }))
    .sort((a, b) => (a.d < b.d ? 1 : -1));
});

const visibles = computed(() => resultados.value.slice(0, limite.value));
watch(consulta, () => { limite.value = 30; abierto.value = null; });

function formatearFecha(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
</script>

<style scoped>
.juris-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 16px 64px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1a1a1a;
}
.volver { display: inline-block; margin-bottom: 16px; color: #1a1a1a; }
h1 { font-size: 1.5rem; margin: 0 0 12px; }
.intro, .aviso { line-height: 1.5; margin: 0 0 10px; }
.aviso { font-size: 0.9rem; color: #555; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.buscar {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  font-size: 1rem;
  border: 1px solid #c9ced6;
  border-radius: 8px;
  margin: 8px 0 16px;
}
.sugerencias { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.etiqueta { font-size: 0.9rem; color: #555; }
.chip {
  padding: 6px 12px;
  border: 1px solid #c9ced6;
  border-radius: 999px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}
.subtitulo { font-size: 1.1rem; margin: 20px 0 12px; }
.lista { list-style: none; padding: 0; margin: 0; }
.fallo { border-top: 1px solid #eaeaea; padding: 12px 0; }
.cita { margin: 0; line-height: 1.5; }
.resultado { margin: 4px 0 0; font-size: 0.85rem; color: #555; }
.estado, .error { margin-top: 16px; }
.abrir {
  margin-top: 8px;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: #f5c400;
  color: #111;
  font-weight: 700;
  cursor: pointer;
}
.mas { display: block; margin: 16px auto 0; }
.detalle { margin-top: 12px; padding: 16px; border-radius: 10px; background: #f7f7f7; }
.detalle h3 { margin: 0 0 4px; font-size: 1rem; }
.aviso-ficha { margin: 0 0 8px; font-size: 0.85rem; color: #555; }
.texto {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: 0.92rem;
  line-height: 1.5;
  margin: 0 0 8px;
}
.fallo-completo { max-height: 70vh; overflow-y: auto; background: #fff; padding: 12px; border-radius: 8px; border: 1px solid #e3e3e3; }
.error { color: #9b1c1c; }
</style>
