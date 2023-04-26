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
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

async function myPromise(amount, step, delay) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();

  const { value: amount } = amountEl;
  const { value: step } = stepEl;
  const { value: delay } = delayEl;

  myPromise(Number(amount), Number(step), Number(delay));
});
