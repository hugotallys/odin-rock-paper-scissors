const ROCK = '🪨Rock';
const PAPER = '📄Paper';
const SCISSORS = '✂️Scissors';

const gameRules = {
    [ROCK]: { [ROCK]: "It's a tie!", [PAPER]: `${PAPER} beats ${ROCK}, the computer wins this round!`, [SCISSORS]: `${ROCK} beats ${SCISSORS}, you win this round!` },
    [PAPER]: { [PAPER]: "It's a tie!", [SCISSORS]: `${SCISSORS} beats ${PAPER}, the computer wins this round!`, [ROCK]: `${PAPER} beats ${ROCK}, you win this round!` },
    [SCISSORS]: { [SCISSORS]: "It's a tie!", [ROCK]: `${ROCK} beats ${SCISSORS}, the computer wins this round!`, [PAPER]: `${SCISSORS} beats ${PAPER}, you win this round!` },
};

function getRandomInt(n) {
    return Math.floor(n * Math.random());
}

function getComputerChoice() {
    const choices = [ROCK, PAPER, SCISSORS];
    return choices[getRandomInt(3)];
}

function playRound(humanChoice, computerChoice) {
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

const contentDiv = document.querySelector("#content");

const playerScoreDiv = document.querySelector("#player-score");
const computerScoreDiv = document.querySelector("#computer-score");

[rockButton, paperButton, scissorsButton].forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const humanSelected = e.target.innerText;
        const computerSelected = getComputerChoice();

        playRound(humanSelected, computerSelected);

        const choiceDiv = document.createElement("div");

        const choiceP = document.createElement("p");
        choiceP.innerText = `${humanSelected} (Player) VS ${computerSelected} (Computer)`;
        choiceP.style["text-align"] = "center";

        const resultP = document.createElement("p");
        resultP.innerText = gameRules[humanSelected][computerSelected];
        resultP.style["text-align"] = "center";

        choiceDiv.appendChild(choiceP);
        choiceDiv.appendChild(resultP);

        if (contentDiv.childElementCount > 2) {
            contentDiv.removeChild(contentDiv.lastElementChild);
        }

        contentDiv.appendChild(choiceDiv);

        playerScoreDiv.innerText = `Player Score ${playerScore}`;
        computerScoreDiv.innerText = `Computer Score ${computerScore}`;
    });
});
