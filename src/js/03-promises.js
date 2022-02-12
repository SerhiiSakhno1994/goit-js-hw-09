import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submit: document.querySelector('button[type="submit"]')
};

refs.submit.addEventListener('click', clickSubmit);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function clickSubmit(e) {
  e.preventDefault();
  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  for (let i = 1; i <= amount; i += 1) {
    if (i > 1) {
      delay += step;
      console.log(i);
      console.log(delay);
      
    }
      createPromise(i, delay)
        .then(({ position, delay }) => {
        console.log(i);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(i);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    
  }
}


