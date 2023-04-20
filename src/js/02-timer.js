import Notiflix from 'notiflix';
// Importujemy bibliotekę flatpickr
import flatpickr from 'flatpickr';
// Importujemy styl CSS biblioteki flatpickr
import 'flatpickr/dist/flatpickr.min.css';

//dostep do input w ktorym wybierana jest data i godzina
const dateInput = document.querySelector('#datetime-picker');
// dostęp do BTN
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');

// ręczne wyłączenie przycisku resetu na początku działania skryptu
disableResetButton();

// pobieramy minutnik, dla dni,godzin, minut, sekund
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// Zmienna przechowująca identyfikator interwału dla licznika
let countdownInterval;

// ustawienia flatpickr
// metoda onClose tu część obiektu,wywołana kiedy użytkownik zamknie wybieranie daty
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    //dopisana cześć kodu
    const date = new Date();
    const selectedDate = selectedDates[0];

    // jeśli selectedData jest z przeszłosci/ mniejsza od date
    // wyświetl window.alert()  i zablokuj startBtn

    if (selectedDate <= date) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
      disableResetButton(); // ręczne wyłączenie przycisku resetu
    } else {
      startBtn.disabled = false;
      enableResetButton(); // ręczne włączenie przycisku resetu
      startBtn.addEventListener('click', () => {
        startCountdown(selectedDate);
      });
    }
  },

  // funkcje pomocnicze do wyłączania i włączania przycisku resetu
function disableResetButton() {
    resetBtn.disabled = true;
  }
  
  function enableResetButton() {
    resetBtn.disabled = false;
  }
};

// odliczanie
function startCountdown(endDate) {
  clearInterval(countdownInterval); // czyszczenie  countdownInterval
  //nowy interwał
  countdownInterval = setInterval(() => {
    const timeRemaining = convertMs(endDate - new Date());
    if (timeRemaining < 0) {
      clearInterval(countdownInterval);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    } else {
      daysEl.textContent = timeRemaining.days;
      hoursEl.textContent = timeRemaining.hours;
      minutesEl.textContent = timeRemaining.minutes;
      secondsEl.textContent = timeRemaining.seconds;
    }
  }, 1000);
}

// Obliczenie dni, godzin, minut i sekund, kod obliczanie ile czasu pozostało do wybranej daty i godziny
// kod z zadania
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days/pozostałe dni
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// metoda toString przekształca liczby el na string
// metoda padStart dodaje 0 przed 1-cyfrowymi liczbami
function addLeadingZero(el) {
  return el.toString().padStart(2, '0');
}

// 2 wersja odliczania czasu?
// const startCountdown = () => {
//   const remainingTime = convertMs(selectedDate - new Date());
//   if (selectedDate - new Date() > 0) {
//     daysEl.textContent = addLeadingZero(remainingTime.days);
//     hoursEl.textContent = addLeadingZero(remainingTime.hours);
//     minutesEl.textContent = addLeadingZero(remainingTime.minutes);
//     secondsEl.textContent = addLeadingZero(remainingTime.seconds);
//   }
// };

// inicjalizacja flatpickr
flatpickr(dateInput, options);
