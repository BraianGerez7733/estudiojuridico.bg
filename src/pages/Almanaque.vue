<template>
  <div class="calendar-page">
    <div class="container">
      <div class="calendar-header">
        <button @click="prevMonth" class="nav-btn"><i class="fas fa-chevron-left"></i></button>
        <h1 class="month-title">{{ monthName }} {{ currentYear }}</h1>
        <button @click="nextMonth" class="nav-btn"><i class="fas fa-chevron-right"></i></button>
      </div>

      <div class="calendar-grid">
        <div class="weekday" v-for="day in weekDays" :key="day">{{ day }}</div>
        
        <div 
          class="day-cell empty" 
          v-for="blank in blankDays" 
          :key="'blank-' + blank"
        ></div>
        
        <div 
          class="day-cell" 
          v-for="date in daysInMonth" 
          :key="'date-' + date"
          :class="{ 'today': isToday(date) }"
          @click="openDayModal(date)"
          title="Haz clic para ver las tareas de este día"
        >
          <span class="date-number">{{ date }}</span>
          <div class="events-container">
            <div 
              class="event-badge" 
              v-for="(event, idx) in getEvents(date)" 
              :key="idx"
              @click.stop="removeEvent(date, idx)"
              title="Clic para borrar esta tarea"
            >
              <span class="event-text">{{ event.text }}</span>
              <i class="fas fa-times delete-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para gestionar eventos de un día -->
    <div class="modal-overlay" v-if="isModalOpen" @click.self="closeDayModal">
      <div class="modal-content fade-in">
        <div class="modal-header">
          <h2>Eventos del <span class="highlight">{{ selectedDate }}</span> de {{ monthName.toLowerCase() }}</h2>
          <button @click="closeDayModal" class="icon-btn-close"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="modal-events-list">
          <div v-if="getEvents(selectedDate).length === 0" class="no-events">
            <i class="far fa-calendar-times"></i>
            <p>No hay tareas ni audiencias para este día.</p>
          </div>
          <div class="modal-event-item" v-for="(event, idx) in getEvents(selectedDate)" :key="event.id || idx">
            <span class="modal-event-text">{{ event.text }}</span>
            <button class="delete-event-btn" @click="removeEvent(selectedDate, idx)" title="Borrar tarea"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>

        <div class="modal-add-form">
          <input type="text" v-model="newEventText" placeholder="Escribe una nueva nota, tarea o audiencia..." @keyup.enter="addNewEvent" class="modern-input" />
          <button @click="addNewEvent" class="add-note-btn"><i class="fas fa-plus"></i> Añadir Nota</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../supabase';

const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const dateObj = ref(new Date());

const currentYear = computed(() => dateObj.value.getFullYear());
const currentMonth = computed(() => dateObj.value.getMonth());

const monthName = computed(() => {
  return dateObj.value.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
});

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const blankDays = computed(() => {
  // 0 = Sunday, 1 = Monday...
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const isToday = (date) => {
  const today = new Date();
  return date === today.getDate() &&
         currentMonth.value === today.getMonth() &&
         currentYear.value === today.getFullYear();
};

const prevMonth = () => {
  dateObj.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  dateObj.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const isModalOpen = ref(false);
const selectedDate = ref(null);
const newEventText = ref('');

const openDayModal = (date) => {
  selectedDate.value = date;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden'; // Evita scroll de fondo
};

const closeDayModal = () => {
  isModalOpen.value = false;
  newEventText.value = '';
  document.body.style.overflow = '';
};

// --- LÓGICA DE EVENTOS (Supabase + LocalStorage) ---
const events = ref({});

const fetchEvents = async () => {
  // 1. Cargar desde LocalStorage primero
  const localData = localStorage.getItem('almanaque_events');
  if (localData) {
    events.value = JSON.parse(localData);
  }

  // 2. Intentar sincronizar con Supabase
  try {
    const { data, error } = await supabase.from('almanaque_events').select('*');
    if (!error && data) {
      const loadedEvents = {};
      data.forEach((evt) => {
        if (!loadedEvents[evt.date_key]) {
          loadedEvents[evt.date_key] = [];
        }
        // Aseguramos que siempre haya un texto visible
        loadedEvents[evt.date_key].push({
          ...evt,
          text: evt.text || evt.title || evt.titulo || '(Nota sin texto)'
        });
      });
      events.value = loadedEvents;
      localStorage.setItem('almanaque_events', JSON.stringify(events.value));
    }
  } catch (err) {
    console.log('Trabajando en modo offline (LocalStorage)');
  }
};

onMounted(() => {
  fetchEvents();
});

const getEvents = (date) => {
  const key = `${currentYear.value}-${currentMonth.value}-${date}`;
  return events.value[key] || [];
};

const addNewEvent = async () => {
  const text = newEventText.value.trim();
  if (!text) return;
  
  const date = selectedDate.value;
  const key = `${currentYear.value}-${currentMonth.value}-${date}`;
  const newEvent = { id: Date.now().toString(), date_key: key, text };
  
  if (!events.value[key]) {
    events.value[key] = [];
  }
  events.value[key].push(newEvent);
  
  // Limpiamos el input
  newEventText.value = '';
  
  // Guardamos en LocalStorage
  localStorage.setItem('almanaque_events', JSON.stringify(events.value));

  // Intentamos guardar en Supabase en segundo plano
  try {
    const { data, error } = await supabase.from('almanaque_events').insert([{ date_key: key, text }]).select();
    if (!error && data && data.length > 0) {
      const lastIndex = events.value[key].length - 1;
      events.value[key][lastIndex].id = data[0].id;
      localStorage.setItem('almanaque_events', JSON.stringify(events.value));
    }
  } catch (err) {}
};

const removeEvent = async (date, idx) => {
  if (confirm('¿Deseas borrar esta auditoría/tarea?')) {
    const key = `${currentYear.value}-${currentMonth.value}-${date}`;
    const eventToDelete = events.value[key][idx];
    
    // Borramos localmente
    events.value[key].splice(idx, 1);
    if (events.value[key].length === 0) {
      delete events.value[key];
    }
    localStorage.setItem('almanaque_events', JSON.stringify(events.value));
    
    // Intentamos sincronizar con Supabase
    if (eventToDelete && eventToDelete.id) {
      try {
        await supabase.from('almanaque_events').delete().eq('id', eventToDelete.id);
      } catch (err) {}
    }
  }
};
</script>

<style scoped>
.calendar-page {
  background-color: #f7f9fc;
  padding: 40px 20px;
  flex-grow: 1;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  padding: 30px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.month-title {
  font-size: 2rem;
  color: #1a202c;
  margin: 0;
  text-transform: capitalize;
}

.nav-btn {
  background: #edf2f7;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  color: #4a5568;
  font-size: 1.2rem;
}

.nav-btn:hover {
  background: #e2e8f0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.weekday {
  background-color: #f8fafc;
  padding: 15px 10px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.day-cell {
  background-color: white;
  min-height: 120px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: background-color 0.2s;
  position: relative;
}

.events-container {
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-badge {
  background-color: var(--primary-color, #f7c70a);
  color: #1a202c;
  font-size: 0.75rem;
  padding: 4px 6px;
  border-radius: 4px;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: filter 0.2s;
}

.event-badge:hover {
  filter: brightness(0.9);
}

.event-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  text-align: left;
}

.delete-icon {
  margin-left: 4px;
  font-size: 0.7rem;
  opacity: 0.6;
}

.event-badge:hover .delete-icon {
  opacity: 1;
}

.day-cell:hover:not(.empty) {
  background-color: #f7fafc;
  cursor: pointer;
}

.empty {
  background-color: #fdfdfd;
}

.date-number {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d3748;
}

.today .date-number {
  background-color: var(--primary-color, #0077b6);
  color: var(--secondary-color, white);
}

@media (max-width: 768px) {
  .day-cell {
    min-height: 80px;
    justify-content: center;
  }
  .month-title {
    font-size: 1.5rem;
  }
}

/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 15px;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin: 0;
  font-weight: 600;
}
.highlight {
  color: var(--primary-color, #f7c70a);
  font-weight: 700;
}

.icon-btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;
}
.icon-btn-close:hover {
  color: #ef4444;
}

.modal-events-list {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.no-events {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  padding: 40px 0;
}
.no-events i {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.5;
}

.modal-event-item {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.modal-event-text {
  font-size: 1rem;
  color: #334155;
  font-weight: 500;
  word-break: break-word;
  padding-right: 15px;
}

.delete-event-btn {
  background-color: #fee2e2;
  color: #ef4444;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.delete-event-btn:hover {
  background-color: #ef4444;
  color: white;
}

.modal-add-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f1f5f9;
  padding: 15px;
  border-radius: 8px;
}

.modern-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}

.modern-input:focus {
  border-color: var(--primary-color, #f7c70a);
  box-shadow: 0 0 0 3px rgba(247, 199, 10, 0.1);
}

.add-note-btn {
  background-color: #1a1a1a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
  width: 100%;
}
.add-note-btn:hover {
  background-color: #333;
}
.fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
