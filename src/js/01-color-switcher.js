const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let changeColor = null;

disableBtnStop()

function disableBtnStop() {
  refs.btnStop.setAttribute('disabled', 'disabled');
  refs.btnStart.removeAttribute('disabled');
  clearInterval(changeColor);
}

function disableBtnStart() {
  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnStop.removeAttribute('disabled');
}


function changeBdColour() {
    disableBtnStart();
    changeColor = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Для генерации случайного цвета используй функцию 

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', changeBdColour);
refs.btnStop.addEventListener('click', disableBtnStop);