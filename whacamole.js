const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const duration = document.getElementById('time');

const minTime = 200;
const maxTime = 1000;
const defaultGameLength = 10000;

let lastHole;
let timeUp = false;
let score = 0;

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomHole = holes => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
};

const toMilliseconds = string => parseInt(duration.value, 10) * 1000;

const gameLength = () => {
  return toMilliseconds(duration.value) || defaultGameLength;
};

const loop = () => {
  const time = randomTime(minTime, maxTime);
  const hole = randomHole(holes);

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) loop();
  }, time);
};

const startGame = () => {
  resetGame();
  timeUp = false;

  loop();
  
  setTimeout(() => timeUp = true, gameLength());
};

const stopGame = () => {
  timeUp = true;
  holes.forEach((hole) => {
    hole.classList.remove('up');
  });
};

const resetGame = () => {
  scoreBoard.textContent = score = 0;
}

const whack = ({ target, isTrusted }) => {
  if(!isTrusted) return; // cheater!
  score++;
  target.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
};

moles.forEach(mole => mole.addEventListener('click', whack));
