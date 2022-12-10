const { readFileSync } = require("fs");

const content = readFileSync("./input.txt", "utf-8");


let registerX = 1;

const timeToCompleteInstruction = {
    "addx": 2,
    "noop": 1
}

const signalStrengthAtCicle = {
    20: 0,
    60: 0,
    100: 0,
    140: 0,
    180: 0,
    220: 0
}

let cicles = 0;
content.split(/\r?\n/).forEach((line) => {
    const [instruction, value] = line.split(" ")    
    for (let i = 0; i < timeToCompleteInstruction[instruction]; i++) {
        cicles++
        if(signalStrengthAtCicle[cicles] >= 0) signalStrengthAtCicle[cicles] = cicles * registerX
    }
    if(value) registerX += parseInt(value)
})

const totalSignalStrength = Object.values(signalStrengthAtCicle).reduce((acc,cur) => acc + cur, 0)
console.log(totalSignalStrength)