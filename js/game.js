const grid = document.querySelector('.grid');
const errorSound = document.getElementById("error-sound");
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector ('.timer');

const names = [
  'Caetano',
  'Café',
  'Dança',
  'Diabo',
  'Gato',
  'Morte',
  'Nazaré',
  'Sangue',
  'Senhora',
  'Vieira',
  'Vizinho',
  'Xuxa',    
];

const cardsList = [...names, ...names]; // duplica

const sounds = {
  Xuxa: "/sound/show-da-xuxa.mp3",
  Caetano: "/sound/caetano.mp3",
  Café: "/sound/quero-cafe.mp3",
  Dança: "/sound/meme-caixao.mp3",
  Diabo: "/sound/morre-diabo.mp3",
  Gato: "/sound/bari-papa.mp3",
  Morte: "/sound/amostradinho.mp3",
  Nazaré: "/sound/risada-nazare.mp3",
  Sangue: "/sound/sangue-de-jesus.mp3",
  Senhora: "/sound/senhora.mp3",
  Vieira: "/sound/datena-cadeirada.mp3",
  Vizinho: "/sound/halloween.mp3",
};

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};


let firstCard = '';
let secondCard = '';
let currentTime = 0;
let loop;

const checkEndGame = () => {
const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 24) {
    clearInterval(loop);
    // para a música de fundo
    const music = document.getElementById("bgMusic");
    if (music) {
      music.pause();
      music.currentTime = 0; // opcional: reinicia do começo
}

    // 🃏 revela todas as cartas
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.add('reveal-card'));

    // 🏆 delay antes do alerta
    setTimeout(() => {
      window.alert(`🎉 Parabéns, ${spanPlayer.innerHTML} você venceu! ⏱ Tempo: ${currentTime} segundos`);
    }, 300);
  }
};


const checkCards = () => {
const firstName = firstCard.getAttribute('data-name');
const secondName = secondCard.getAttribute('data-name');

if (firstName === secondName ){

if (sounds[firstName]) {
  const audio = new Audio(sounds[firstName]);
  audio.volume = 0.7;
  audio.play();
}

firstCard.firstChild.classList.add('disabled-card');
secondCard.firstChild.classList.add('disabled-card');

firstCard = '';
secondCard = '';

checkEndGame();


} else {
setTimeout(() =>{
errorSound.currentTime = 0; 
errorSound.play();

firstCard.classList.remove('reveal-card');
secondCard.classList.remove('reveal-card');

firstCard = '';
secondCard = '';

}, 500);

}

}

const revealCard = ({ target }) => {
  const card = target.parentNode;

  // Verifica se a carta já está revelada
  if (card.classList.contains('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    card.classList.add('reveal-card');
    firstCard = card;
  } else if (secondCard === '') {
    card.classList.add('reveal-card');
    secondCard = card;

  
  checkCards();
  }
};


function createCard(names) {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  // aqui usamos imagem
  front.style.backgroundImage = `url('../img/${names}.jpeg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-name', names);


  return card;
}

const loadGame = () => {
  const shuffledList = cardsList.sort(() => Math.random() - 0.5);

  shuffledList.forEach((name) => {
    const card = createCard(name);
    grid.appendChild(card);
  });
};


const startTimer = () => {
currentTime = 0;
loop = setInterval(() => {
  currentTime++; 
  timer.innerHTML = currentTime;
}, 1000); 

}

window.onload = () => {
spanPlayer.innerHTML = localStorage.getItem('player');
startTimer();
loadGame();
}

window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");

  // Estado inicial: mutado
  let isMuted = true;
  music.volume = 0.2;

  muteBtn.addEventListener("click", () => {
    if (isMuted) {
      music.play(); // começa a tocar
      music.volume = 0.2;
      muteIcon.src = "/img/com-som.png";
      muteIcon.alt = "Som ligado";
      isMuted = false;
    } else {
      music.pause(); // pausa a música
      muteIcon.src = "/img/sem-som.png";
      muteIcon.alt = "Som desligado";
      isMuted = true;
    }
  });
});



