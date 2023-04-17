const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Funkcja generująca losowy kolor w formacie heksadecymelowym z zadania
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Funkcja zmieniająca kolor
function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// Działanie Start raz na sekunde zmienia kolor tło,
// Start zostaje zablokowany poprzez ustawienie atrybutu disabled na true
function changerColor() {
  changeEl = setInterval(changeColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

// Działanie Stop
function changerColorStop() {
  clearInterval(changeEl);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// Zdarzenia start i stop
startBtn.addEventListener('click', changerColor);
stopBtn.addEventListener('click', changerColorStop);
