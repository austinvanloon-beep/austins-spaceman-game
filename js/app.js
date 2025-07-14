// user stories

// as a user i want to: 

// see a start screen to start Game
// see a visual theme
// guess letters to figure secret word
// correctly guessed letter to appear on screen
// see which letters are already guessed
// see how many guesses i have left
// see if i won or lost the Game
// be able to play again


// pseudocode
// setup
// make secret words
// set max number of guesses
// set up buttons

// variables?
// feedback on win/loss
// feedback on number of guesses remaining
// feedback on letters guesed correctly/incorrectly

// DOM
// area showing word with blanks
// show letter buttons
// show win/loss message
// show guess counter
// show play again buttons

// function
// pick random word
// reset guesses
// display?

// player interaction
// if guessed correct letter, display
// if guessed incorrectly, display and update guess amount
// update screen
// update win/loss status



let secretWord;
let guessedLetters;
let remainingGuesses;
let gameStatus;

const wordEl = document.getElementById('word');
const lettersEl = document.getElementById('letters');
const messageEl = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const guessesLeftEl = document.getElementById('guesses-left');


function init() {
  const wordList = ['CELESTIAL', 'CONSTELLATION', 'NEBULA', 'SUPERNOVA', 'DARKMATTER'];
  secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  remainingGuesses = 6;
  gameStatus = 'active';
  createLetterButton();
  render();
}



function render() {
  let displayWord = '';
  for (let char of secretWord) {
    displayWord += guessedLetters.includes(char) ? char : '_';
    displayWord += ' ';
  }
  wordEl.textContent = displayWord.trim();

  guessesLeftEl.textContent = `Guesses Left: ${remainingGuesses}`;

  if (gameStatus === 'won') {
    messageEl.textContent = 'You won!';
    playAgainBtn.style.display = 'block';
  } else if (gameStatus === 'lost') {
    messageEl.textContent = `You lost! The word was "${secretWord}"`;
    playAgainBtn.style.display = 'block';
  } else {
    messageEl.textContent = '';
    playAgainBtn.style.display = 'none';
  }
}



function createLetterButton() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  lettersEl.innerHTML = '';
  for (let letter of alphabet) {
    const button = document.createElement('button');
    button.textContent = letter;
    button.addEventListener('click', handleMove);
    lettersEl.appendChild(button);
  }
}



function handleMove(event) {
  const letter = event.target.textContent;
  event.target.disabled = true;

  if (gameStatus !== 'active' || guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (!secretWord.includes(letter)) {
    remainingGuesses--;
    messageEl.textContent = `Oops! "${letter}" is not in the word.`;
  } else {
    messageEl.textContent = '';
  }

  const isWin = secretWord.split('').every(char => guessedLetters.includes(char));
  if (isWin) {
    gameStatus = 'won';
  }
  if (remainingGuesses <= 0) {
    gameStatus = 'lost';
  }
  render();
}

playAgainBtn.addEventListener('click', init);

init();
