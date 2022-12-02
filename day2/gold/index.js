const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');

const rules = {
    X: {encrypted: "A", value: 1, winAgaisnt: "C" }, // ROCK
    Y: {encrypted: "B", value: 2, winAgaisnt: "A" }, // PAPER
    Z: {encrypted: "C", value: 3, winAgaisnt: "B" } // SCISSORS
}

const elfInfo = {
    Y: { A: "X", B: "Y", C: "Z", value: 3 }, // DRAW
    X: { A: "Z", B: "X", C: "Y", value: 0 }, // LOSE
    Z: { A: "Y", B: "Z", C: "X", value: 6 }, // WIN
}

const solution = {
    totalPoints: 0
}

content.split(/\r?\n/).forEach((line) => {
  const [opponentChoice, myOutcomeShouldBe] = line.split(" ");
  const hint = elfInfo[myOutcomeShouldBe][opponentChoice];
  const value = rules[hint].value;

  solution.totalPoints += value + elfInfo[myOutcomeShouldBe].value
});


console.log(solution.totalPoints)