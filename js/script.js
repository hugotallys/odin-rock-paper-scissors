const ROCK = '🪨Rock';
const PAPER = '📄Paper';
const SCISSORS = '✂️Scissors';

const gameRules = {
    [ROCK]: { [ROCK]: "It's a tie!", [PAPER]: `${PAPER} beats ${ROCK}, the computer wins this round!`, [SCISSORS]: `${ROCK} beats ${SCISSORS}, you win this round!` },
    [PAPER]: { [PAPER]: "It's a tie!", [SCISSORS]: `${SCISSORS} beats ${PAPER}, the computer wins this round!`, [ROCK]: `${PAPER} beats ${ROCK}, you win this round!` },
    [SCISSORS]: { [SCISSORS]: "It's a tie!", [ROCK]: `${ROCK} beats ${SCISSORS}, the computer wins this round!`, [PAPER]: `${SCISSORS} beats ${PAPER}, you win this round!` },
};

const WINNER_SCORE = 5;

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
let hasWinner = false;

const rockButton = document.querySelector("#rock-btn");
const paperButton = document.querySelector("#paper-btn");
const scissorsButton = document.querySelector("#scissors-btn");

const contentDiv = document.querySelector("#content");

const playerScoreDiv = document.querySelector("#player-score");
const computerScoreDiv = document.querySelector("#computer-score");

function cleanUp() {
    contentDiv.removeChild(contentDiv.lastElementChild);
    contentDiv.removeChild(contentDiv.lastElementChild);

    playerScore = 0;
    computerScore = 0;

    playerScoreDiv.innerText = `Player Score ${playerScore}`;
    computerScoreDiv.innerText = `Computer Score ${computerScore}`;

    hasWinner = false;
}

[rockButton, paperButton, scissorsButton].forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (hasWinner) return;

        const humanSelected = e.target.innerText;
        const computerSelected = getComputerChoice();

        playRound(humanSelected, computerSelected);

        const choiceDiv = document.createElement("div");

        const choiceP = document.createElement("p");
        choiceP.innerText = `${humanSelected} (Player) VS ${computerSelected} (Computer)`;
        choiceP.style["text-align"] = "center";
        choiceDiv.appendChild(choiceP);

        const resultP = document.createElement("p");

        resultP.innerText = gameRules[humanSelected][computerSelected];
        resultP.style["text-align"] = "center";

        choiceDiv.appendChild(resultP);

        if (contentDiv.childElementCount > 2) {
            contentDiv.removeChild(contentDiv.lastElementChild);
        }

        contentDiv.appendChild(choiceDiv);

        playerScoreDiv.innerText = `Player Score ${playerScore}`;
        computerScoreDiv.innerText = `Computer Score ${computerScore}`;

        if (playerScore === WINNER_SCORE || computerScore === WINNER_SCORE) {
            const winnerDiv = document.createElement("div");
            const winnerP = document.createElement("p");
            const resetButton = document.createElement("button");

            if (playerScore === WINNER_SCORE) {
                winnerP.innerText = "🎉 Congratulations, you won! 🎉";
            } else {
                winnerP.innerText = "😞 The computer won, maybe next time... 😞"
            }

            resetButton.innerText = "Play Again";
            resetButton.onclick = () => cleanUp();

            winnerDiv.style["text-align"] = "center";

            winnerDiv.appendChild(winnerP);
            winnerDiv.appendChild(resetButton);

            contentDiv.appendChild(winnerDiv);

            hasWinner = true;
        }
    });
});
