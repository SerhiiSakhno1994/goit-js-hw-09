// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  timer: document.querySelector('timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

disableStartBtn();


refs.input.addEventListener('click', flatpickr);
refs.start.addEventListener('click', countDown);


let stopTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
        console.log(selectedDates[0]);
    const date = new Date();
    if (selectedDates[0] < date) {
      Notiflix.Report.warning('ATTENTION!!!!', 'Please choose a date in the future', 'close');
      return disableStartBtn();
    }
    refs.start.removeAttribute('disabled');
    stopTime = selectedDates[0].getTime();
  },
};


flatpickr(refs.input, options);



function countDown() {
  const intervalId = null;
  intervalId = setInterval(startTimer, 1000);
  function startTimer() {
    const currentTime = Date.now();
    const deltaTime = stopTime - currentTime;

    disableStartBtn();
    if (deltaTime > 0) {
      const timeUpDate = convertMs(deltaTime);
      updateClock(timeUpDate);
      clearInterval(intervalId);
    };
  }
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function disableStartBtn() {
  refs.start.setAttribute('disabled', 'disabled');
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}