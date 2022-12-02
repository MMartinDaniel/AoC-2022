const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');
const elves = [];
let currentCount = 0;

content.split(/\r?\n/).forEach((line) => {
    if(line !== "") {
        currentCount += parseInt(line);
    }else {
        elves.push(currentCount)
        currentCount = 0;
    }
});
elves.push(currentCount)
elves.sort((a,b) => a-b)

const total = [0,1,2].reduce((acc) => acc += elves.pop(),0)

console.log(total)
