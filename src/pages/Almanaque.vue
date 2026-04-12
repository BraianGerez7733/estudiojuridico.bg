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
          @click="addEvent(date)"
          title="Haz clic para agregar una tarea o audiencia"
        >
          <span class="date-number">{{ date }}</span>
          <div class="events-container">
            <div 
              class="event-badge" 
              v-for="(event, idx) in getEvents(date)" 
              :key="idx"
            >
              {{ event }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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

// --- LÓGICA DE EVENTOS (LocalStorage) ---
const events = ref(JSON.parse(localStorage.getItem('almanaque_events')) || {});

const getEvents = (date) => {
  const key = `${currentYear.value}-${currentMonth.value}-${date}`;
  return events.value[key] || [];
};

const addEvent = (date) => {
  const text = window.prompt(`Nueva tarea/audiencia para el día ${date}:`);
  if (!text || text.trim() === '') return;
  
  const key = `${currentYear.value}-${currentMonth.value}-${date}`;
  if (!events.value[key]) {
    events.value[key] = [];
  }
  
  events.value[key].push(text.trim());
  localStorage.setItem('almanaque_events', JSON.stringify(events.value));
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
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
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
</style>
