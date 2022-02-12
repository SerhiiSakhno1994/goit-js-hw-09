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




let stopTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
       const date = new Date();
    stopTime = selectedDates[0].getTime();
    if (selectedDates[0] < date) {
    //   window.alert('введите дату которая еще не прошла');
        Notiflix.Report.warning('ВНИМАНИЕ!!!!', 'введите дату которая еще не прошла', 'закрыть');
    }
  },
};


flatpickr(refs.input, options);

refs.start.addEventListener('click', countDown);

function countDown () { 
let intervalId = null;
  disableStartBtn()
  intervalId = setInterval(startTimer, 1000);
  function startTimer() {
    const currentDate = Date.now();
    const deltaTime = stopTime - currentDate;
    console.log(deltaTime);
    if (deltaTime < 1000) {
      clearInterval(intervalId);
    }

    const timeUpDate = convertMs(deltaTime);
    updateClock(timeUpDate);
  }
};

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