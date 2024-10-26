function getRandomInt(n) {
    return Math.floor(n * Math.random());
}

function getComputerChoice() {
    let choices = ['R', 'P', 'S'];
    return choices[getRandomInt(3)];
}

function getHumanChoice(currentRound, totalRounds) {
    let humanChoice = prompt(`Round ${currentRound}/${totalRounds}: Choose 🪨Rock (R), 📄Paper (P) or ✂️Scissors (S)`);
    return humanChoice;
}

function playRound(humanChoice, computerChoice, currentRound, totalRounds) {
    const mapChoice = {
        'R': "🪨Rock",
        'P': "📄Paper",
        'S': "✂️Scissors"
    };

    humanChoice = humanChoice.toUpperCase()

    if (mapChoice[humanChoice] === undefined) {
        window.alert("You must enter R for 🪨Rock, P for 📄Paper or S for ✂️Scissors!");
        return true;
    } else {
        console.log(`--- Round ${currentRound} of ${totalRounds}: ---`);
        console.log(`You chose ${mapChoice[humanChoice]}`);
        console.log(`The computer chose ${mapChoice[computerChoice]}`);

        if (humanChoice === 'R') {
            if (computerChoice === 'R') {
                console.log("It's a tie!");
            } else if (computerChoice === 'P') {
                console.log("📄Paper beats 🪨Rock, the computer wins!");
                computerScore += 1;
            } else {
                console.log("🪨Rock beats ✂️Scissors, you win!");
                playerScore += 1;
            }
        } else if (humanChoice === 'P') {
            if (computerChoice === 'P') {
                console.log("It's a tie!");
            } else if (computerChoice === 'S') {
                console.log("✂️Scissors beats Paper, the computer wins!");
                computerScore += 1;
            } else {
                console.log("📄Paper beats 🪨Rock, you win!");
                playerScore += 1;
            }
        } else {
            if (computerChoice === 'S') {
                console.log("It's a tie!");
            } else if (computerChoice === 'R') {
                console.log("🪨Rock beats ✂️Scissors, the computer wins!");
                computerScore += 1;
            } else {
                console.log("✂️Scissors beats 📄Paper, you win!");
                playerScore += 1;
            }
        }
        return false;
    }
}

function playGame(rounds = 5) {
    for (let i = 0; i < rounds; i++) {
        let computerSelected = getComputerChoice();
        let humanSelected = getHumanChoice(i + 1, rounds);

        let repeat = playRound(humanSelected, computerSelected, i + 1, rounds);

        if (repeat)
            i -= 1;
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
