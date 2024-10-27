const ROCK = '🪨Rock';
const PAPER = '📄Paper';
const SCISSORS = '✂️Scissors';

const gameRules = {
    [ROCK]: { [ROCK]: "It's a tie!", [PAPER]: `${PAPER} beats ${ROCK}, the computer wins!`, [SCISSORS]: `${ROCK} beats ${SCISSORS}, you win!` },
    [PAPER]: { [PAPER]: "It's a tie!", [SCISSORS]: `${SCISSORS} beats ${PAPER}, the computer wins!`, [ROCK]: `${PAPER} beats ${ROCK}, you win!` },
    [SCISSORS]: { [SCISSORS]: "It's a tie!", [ROCK]: `${ROCK} beats ${SCISSORS}, the computer wins!`, [PAPER]: `${SCISSORS} beats ${PAPER}, you win!` },
};

function getRandomInt(n) {
    return Math.floor(n * Math.random());
}

function getComputerChoice() {
    const choices = [ROCK, PAPER, SCISSORS];
    return choices[getRandomInt(3)];
}

function playRound(humanChoice, computerChoice) {
    console.log(`You chose ${humanChoice}`);
    console.log(`The computer chose ${computerChoice}`);

    console.log(gameRules[humanChoice][computerChoice]);

    if (gameRules[humanChoice][computerChoice].includes("computer wins")) {
        computerScore += 1;
    } else if (gameRules[humanChoice][computerChoice].includes("you win")) {
        playerScore += 1;
    }

    return false;
}

let playerScore = 0;
let computerScore = 0;

const rockButton = document.querySelector("#rock-btn");
const paperButton = document.querySelector("#paper-btn");
const scissorsButton = document.querySelector("#scissors-btn");

[rockButton, paperButton, scissorsButton].forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const humanSelected = e.target.innerText;
        const computerSelected = getComputerChoice();

        playRound(humanSelected, computerSelected);

        console.log(`--- You won ${playerScore} rounds and the computer won ${computerScore} ---`);

        if (playerScore > computerScore) {
            console.log("😄Congratulations! You are the winner!");
        } else if (playerScore < computerScore) {
            console.log("😞Maybe next time, the computer is the winner...");
        } else {
            console.log("😅Not bad, but the game is a tie!");
        }
    });
});

// playGame();
