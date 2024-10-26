const ROCK = '🪨Rock';
const PAPER = '📄Paper';
const SCISSORS = '✂️Scissors';

const gameRules = {
    R: { R: "It's a tie!", P: `${PAPER} beats ${ROCK}, the computer wins!`, S: `${ROCK} beats ${SCISSORS}, you win!` },
    P: { P: "It's a tie!", S: `${SCISSORS} beats ${PAPER}, the computer wins!`, R: `${PAPER} beats ${ROCK}, you win!` },
    S: { S: "It's a tie!", R: `${ROCK} beats ${SCISSORS}, the computer wins!`, P: `${SCISSORS} beats ${PAPER}, you win!` },
};

function getRandomInt(n) {
    return Math.floor(n * Math.random());
}

function getComputerChoice() {
    const choices = ['R', 'P', 'S'];
    return choices[getRandomInt(3)];
}

function getHumanChoice(currentRound, totalRounds) {
    const humanChoice = prompt(`Round ${currentRound}/${totalRounds}: Choose ${ROCK} (R), ${PAPER} (P) or ${SCISSORS} (S)`);
    return humanChoice;
}

function playRound(humanChoice, computerChoice, currentRound, totalRounds) {
    const mapChoice = {
        'R': ROCK,
        'P': PAPER,
        'S': SCISSORS
    };

    humanChoice = humanChoice.toUpperCase();

    if (mapChoice[humanChoice] === undefined) {
        window.alert(`You must enter R for ${ROCK}, P for ${PAPER}, or S for ${SCISSORS}!`);
        return true;
    } else {
        console.log(`--- Round ${currentRound} of ${totalRounds}: ---`);
        console.log(`You chose ${mapChoice[humanChoice]}`);
        console.log(`The computer chose ${mapChoice[computerChoice]}`);

        console.log(gameRules[humanChoice][computerChoice]);

        if (gameRules[humanChoice][computerChoice].includes("computer wins")) {
            computerScore += 1;
        } else if (gameRules[humanChoice][computerChoice].includes("you win")) {
            playerScore += 1;
        }

        return false;
    }
}

function playGame(rounds = 5) {
    for (let i = 0; i < rounds; i++) {
        const computerSelected = getComputerChoice();
        const humanSelected = getHumanChoice(i + 1, rounds);

        const repeat = playRound(humanSelected, computerSelected, i + 1, rounds);

        if (repeat) i -= 1;
    }
    console.log(`--- You won ${playerScore} rounds and the computer won ${computerScore} ---`);
    if (playerScore > computerScore) {
        console.log("😄Congratulations! You are the winner!");
    } else if (playerScore < computerScore) {
        console.log("😞Maybe next time, the computer is the winner...");
    } else {
        console.log("😅Not bad, but the game is a tie!");
    }
}

let playerScore = 0;
let computerScore = 0;

playGame();
