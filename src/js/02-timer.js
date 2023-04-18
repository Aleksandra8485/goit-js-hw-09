import Notiflix from 'notiflix';
// Importujemy bibliotekę flatpickr
import flatpickr from 'flatpickr';
// Importujemy styl CSS biblioteki flatpickr
import 'flatpickr/dist/flatpickr.min.css';

//dostep do input w ktorym wybirana jest data i godzina
const dateInput = document.getElementById('datetime-picker');

// buttony do zdarzenia interakcja
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');

// pobieramy minutnik, dla dni,godzin, minut, sekund
const daysTime = document.querySelector('[data-days]');
const hoursTime = document.querySelector('[data-hours]');
const minutesTime = document.querySelector('[data-minutes]');
const secondsTime = document.querySelector('[data-seconds]');

// z dokumentacji , drugi argument funkcji flatpickr(selector, options)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
