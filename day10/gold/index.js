const { readFileSync } = require("fs");

const content = readFileSync("./input.txt", "utf-8");


let registerX = 1;

const timeToCompleteInstruction = {
    "addx": 2,
    "noop": 1
}


const CRT_WIDTH = 40
const CRT_HEIGHT = 6

const  crt = []
for (let i = 0; i < CRT_HEIGHT; i++) {
    crt[i] = []
    for (let j = 0; j < CRT_WIDTH ; j++) {
        crt[i][j] = "."
        
    }
}

const printCrt = () => {
    for (let i = 0; i < CRT_HEIGHT; i++) {
       console.log(crt[i].join(""))
    }     
}


let cicles = 0;
let currentPosition = -1;


const printCrtRow = (CurrentCicle, currentPosition) => {

    for (let i = 0; i < 10; i++) 
        if(CurrentCicle <= i * 20 * 2) {
            if(spritePosition[currentPosition] === "#") crt[i-1][currentPosition] = "#"
            return crt[i-1].slice(0, currentPosition+1).join("") 
        }
}

const spritePosition = []

const drawSprite = () => {
    for (let i = 0; i < CRT_WIDTH; i++) {
        spritePosition[i] = (i === registerX || i === registerX -1 || i === registerX +1) ? "#" : "."
    }
    return spritePosition.join("")
}
console.log(drawSprite())
content.split(/\r?\n/).forEach((line) => {
    const [instruction, value] = line.split(" ")

    for (let i = 0; i < timeToCompleteInstruction[instruction]; i++) {
        cicles++
        currentPosition++
        console.log(`Start Cicle ${cicles}: being executing ${instruction} ${value}`)
        console.log(`During cycle  ${cicles}: CRT draws pixel in position ${currentPosition}`)
        console.log(`Current CRT row: ${printCrtRow(cicles, currentPosition)}`)
        if(currentPosition === 39) currentPosition = -1;

         console.log("             ")
    }
    if(value) { 
        registerX += parseInt(value)
        console.log(`sprite Position: ${drawSprite()}`)
    }

    console.log(`End of Cicle ${cicles}, value of Register X = ${registerX}`)
    console.log("             ")

})

printCrt()