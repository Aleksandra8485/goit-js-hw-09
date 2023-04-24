// importowanie biblioteki
import Notiflix from 'notiflix';

// pobieram dostęp do inputów i buttona
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');
const submitBtn = document.querySelector('button[type=submit]');

// funkcja createPromise zwraca nową obietnicę
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

// funkcja asynchroniczna myPromise- tworząca wiele obietnic dzięki createPromise
// wykonana tyle razy ile podane w amount
// step i time-określają różnicę czasową między kolejnymi obietnicami i czas, w którym zostanie utworzona pierwsza obietnica
// domyślnie/current ustawione są na 1.
async function myPromise(amount, step, time, current = 1) {
  if (current > amount) return;

  // try...catch
  // Najpierw wykonywany jest kod wewnątrz bloku try.
  // Jeśli nie ma błędów, blok catch jest ignorowany, a interpreter idzie dalej.
  // Jeśli w bloku try wystąpi błąd, jego wykonanie zostaje zatrzymane, a interpreter przejdzie do bloku catch.
  // try-catch, obsługuje wynik każdej obietnicy
  // wyświetla powiadomienia Notiflix w zależności od wyniku
  try {
    const success = await createPromise(current, time);
    Notiflix.Notify.success(success);
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
  // po każdej wykonanej obietnicy time zwiększa się o step
  // funcja myPromise wywoływana jest rekurencyjnie/przez samą siebie
  // ze zwiększoną wartością current, aż current przekroczy ammount
  time += step;
  setTimeout(() => myPromise(amount, step, time, current + 1), time);
}

// wywołanie funkcji myPromise po kliknięciu submitBtn
// funkcja myPromise wywoława z wartościami amount, step i delay jako parametrami
// amount, step i delay-pobrane z formularza (zmienne na górze)
// delay- opóźnienie czasowe przed rozpoczęciem wykonywanie myPromise
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const { value: amount } = amountEl;
  const { value: step } = stepEl;
  const { value: delay } = delayEl;
  setTimeout(() => myPromise(+amount, +step, +delay), +delay);
  let time = +delay;
});
