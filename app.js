let presentPlayer = 'O';
const boxElement = document.querySelectorAll('.box');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let xAttempts = [];
let oAttempts = [];
let click = 0;
let wonTheGame = 0;
const message = document.getElementById('message');
const gameResult = document.getElementById('result');
const restart = document.getElementById('button');

boxElement.forEach((box) => {
    box.onclick = handleClick;
});

function handleClick(e) {
    if (e.currentTarget && !e.currentTarget.innerHTML && !wonTheGame) {
        presentPlayer = presentPlayer === 'O' ? 'X' : 'O';
        e.currentTarget.innerHTML = `<p class="tic-tac ${presentPlayer === 'X' ? 'x' : 'o'}">${presentPlayer}</p>`;
        const index = parseInt(e.currentTarget.id) - 1;

        if (presentPlayer === 'X') {
            xAttempts.push(index);
            result(winningCombinations, xAttempts, 'X');
        } else {
            oAttempts.push(index);
            result(winningCombinations, oAttempts, 'O');
        }

        click++;

        if (click === 9 && !wonTheGame) {
            displayResult("It's a tie 🤝 ");
        }
    }
}

function result(winningCombinations, attempts, player) {
    for (let combination of winningCombinations) {
        if (combination.every((index) => attempts.includes(index))) {
            wonTheGame = 1;
            displayResult(`'${player}' Won the game!`);
            break;
        }
    }
}

function displayResult(result) {
    gameResult.style.visibility = 'visible';
    message.innerText = result;
}

restart.onclick = () => {
    presentPlayer = 'O';
    xAttempts = [];
    oAttempts = [];
    click = 0;
    wonTheGame = 0;
    message.innerText = '';
    gameResult.style.visibility = 'hidden';

    boxElement.forEach((box) => {
        box.innerHTML = '';
    });
};
