const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');

const rules = {
    X: {encrypted: "A", value: 1, winAgaisnt: "C" }, // ROCK
    Y: {encrypted: "B", value: 2, winAgaisnt: "A" }, // PAPER
    Z: {encrypted: "C", value: 3, winAgaisnt: "B" } // SCISSORS
}


const solution = {
    totalPoints: 0
}

content.split(/\r?\n/).forEach((line) => {
  const [opponentChoice, myChoice] = line.split(" ");
  const outcome = rules[myChoice];

  if(outcome.encrypted === opponentChoice) {
    solution.totalPoints += 3 + outcome.value // DRAW
  } else if(outcome.winAgaisnt === opponentChoice) {
    solution.totalPoints += outcome.value + 6; // WIN
  }else {
    solution.totalPoints += outcome.value // LOSE
  }
});


console.log(solution.totalPoints)