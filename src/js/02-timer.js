// importowanie bibliotek
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // importuje plik Css dla biblioteki flatpickr
import Notiflix from 'notiflix';

// pobieram dostep do inputa
const dateInput = document.getElementById('datetime-picker');

// pobieram dostep do BTN-ów
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-reset]');

// pobieram dostępu do minutnika, dzień/godzina/minuta/sekunda
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// zmienna przechowyjaca wybraną datę
let selectedDate;

// ustawia przycisk resetu na nieaktywny przy uruchomieniu minutnika
resetBtn.disabled = true;

// funkcja konwertująca milisekundy na pozostały czas
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// funkcja dodająca zero przed liczbami jednocyfrowych
const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

// ustawienia bibiloteki flatpickr
const options = {
  enableTime: true, //właczenie czasu
  time_24hr: true, //format 24-godzinny
  defaultDate: new Date(), // ustawienie daty początkowej na dzisiejszą
  minuteIncrement: 1, //inkrementacja/wzrost minut co 1 minutę
  //funkcja zwrotna wywoływana po zamknięciu kalendarza sprawdzajaca czy wybrana data jest datą z przyszłości
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const date = new Date();
    selectedDate = selectedDates[0].getTime();
    selectedDate < date.getTime()
      ? Notiflix.Report.failure('Wybierz date w przyszłości!')
      : startBtn.removeAttribute('disabled'); //ustawia przycisk Start na aktywny
  },
};

// funkcja zeruje minutnik , wybrana wartosc w selectedDate i ustawia na "00"
const countdownResetTime = () => {
  selectedDate = null;
  secondsEl.textContent = '00';
  minutesEl.textContent = '00';
  hoursEl.textContent = '00';
  daysEl.textContent = '00';
};

// funcja pobiera aktualny czas i odejmuje od wybranej daty =oblicza pozostały czas
const countdownStartTime = () => {
  if (!selectedDate) {
    return;
  }
  const leftTime = convertMs(selectedDate - new Date());
  if (selectedDate - new Date() > 0) {
    secondsEl.textContent = addLeadingZero(leftTime.seconds);
    minutesEl.textContent = addLeadingZero(leftTime.minutes);
    hoursEl.textContent = addLeadingZero(leftTime.hours);
    daysEl.textContent = addLeadingZero(leftTime.days);
  } else {
    countdownResetTime();
    Notiflix.Notify.success('Countdown ended!');
  }
};

// callback/funkcja zwrotna dla przycisku start
startBtn.addEventListener('click', () => {
  setInterval(countdownStartTime, 1000); // ustawia interwał (setInterval)który co sekundę wywołuje funkcję countdownStartTime()/wartości wyświetlanych liczników
  startBtn.disabled = true; // dezaktywuje przycisk "Start"
  resetBtn.disabled = false; // aktywuje przycisk "Reset"
  dateInput.disabled = true; // dezaktywuje pole wyboru daty (dateInput)
});
//  callback dla przycisku reset
resetBtn.addEventListener('click', () => {
  dateInput._flatpickr.clear(); // metoda _flatpickr.clear()-resetuje pole wyboru
  countdownResetTime(); // funkcja resetuje liczniki, przywraca pierwotny stan przycisków
  startBtn.disabled = false;
  resetBtn.disabled = true;
  dateInput.disabled = false;
});

// inicjalizacja flatpickr
flatpickr(dateInput, options);
