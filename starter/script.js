'use strict';

const p1Side = document.querySelector('.player--0');
const p1Name = document.getElementById('name--0');
const p1Score = document.getElementById('score--0');
const p1CurrentScore = document.getElementById('current--0');

const p2Side = document.querySelector('.player--1');
const p2Name = document.getElementById('name--1');
const p2Score = document.getElementById('score--1');
const p2CurrentScore = document.getElementById('current--1');

const resetBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');
dice.style.display = 'none';
dice.src = '';


// basically for the ENEMY property
let P1 = {};
let P2 = {};

P1 = {
    name: p1Name.textContent,
    current: 0,
    total: 0,
    side: p1Side,
    winner: false,

    display: () => {
        p1Score.textContent = P1.total;
        p1CurrentScore.textContent = P1.current;
    },
};

P2 = {
    name: p2Name.textContent,
    current: 0,
    total: 0,
    side: p2Side,
    winner: false,

    display: () => {
        p2Score.textContent = P2.total;
        p2CurrentScore.textContent = P2.current;
    },
};

P1.enemy = P2;
P2.enemy = P1;
let currentPlayer = P1;


rollDiceBtn.addEventListener('click', randDice);
holdBtn.addEventListener('click', hold);
resetBtn.addEventListener('click', reset);

// Functions

function swapPlayer() {
    currentPlayer = currentPlayer === P1 ? P2 : P1;
}

function changeSide() {
    currentPlayer.side.classList.toggle('player--active');
    currentPlayer.enemy.side.classList.toggle('player--active');
}

function randDice() {
    if (currentPlayer.winner) return;
    const rand = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${rand}.png`;
    dice.style.display = 'block';
    if (rand === 1) {
        currentPlayer.current = 0;
        currentPlayer.display();
        checkWin();
        changeSide();
        swapPlayer();
    }
    currentPlayer.current += rand;
    currentPlayer.display();
}

function hold() {
    if (currentPlayer.winner) return;
    currentPlayer.total += currentPlayer.current;
    currentPlayer.current = 0;
    currentPlayer.display();
    checkWin();
    // repeat this line becouse I wanna cover the case the user
    // reach the >=100 after clicking hold
    // Is that too repetitive ??
    if (currentPlayer.winner) return;
    swapPlayer();
    changeSide();
}

function checkWin() {
    if (currentPlayer.total >= 100) {
        currentPlayer.side.classList.add('player--winner');
        currentPlayer.win = true;
    }
}

function reset() {
    P1.total = 0;
    P1.current = 0;
    P1.winner = false;
    P2.total = 0;
    P2.current = 0;
    P2.winner = false;
    P1.display();
    P2.display();
    currentPlayer.side.classList.remove('player--winner');
    currentPlayer = P1;
    currentPlayer.side.classList.add('player--active');
}
