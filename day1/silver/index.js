const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');
const elves = [];
let currentCount = 0;

const greedyElf = {
    number: -1,
    amountOfCalories: 0
}

content.split(/\r?\n/).forEach((line) => {
    if(line !== "") {
        currentCount += parseInt(line);
    }else {
        elves.push(currentCount)
        if(currentCount > greedyElf.amountOfCalories) {
            greedyElf.number = elves.length
            greedyElf.amountOfCalories = currentCount
        }
        currentCount = 0;
    }
});

elves.push(currentCount)
console.log(greedyElf)