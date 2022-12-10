const { readFileSync } = require("fs");

const content = readFileSync("./input.txt", "utf-8");

let registerX = 1;
let cicles = 0;
let currentPosition = -1;

const CRT_WIDTH = 40;
const CRT_HEIGHT = 6;
const crt = [];
const spritePosition = [];

const timeToCompleteInstruction = {
  addx: 2,
  noop: 1,
};

// fill CRT
for (let i = 0; i < CRT_HEIGHT; i++) {
  crt[i] = [];
  for (let j = 0; j < CRT_WIDTH; j++) {
    crt[i][j] = ".";
  }
}

const printOnCrtRow = (currentCicle, currentPosition) => {
  for (let i = 0; i < 10; i++)
    if (currentCicle <= i * 20 * 2) {
      if (spritePosition[currentPosition] === "#")
        crt[i - 1][currentPosition] = "#";
      return;
    }
};

const drawSprite = () => {
  for (let i = 0; i < CRT_WIDTH; i++) {
    spritePosition[i] =
      i === registerX || i === registerX - 1 || i === registerX + 1 ? "#" : ".";
  }
};

// draw initial sprite
drawSprite();

content.split(/\r?\n/).forEach((line) => {
  const [instruction, value] = line.split(" ");

  for (let i = 0; i < timeToCompleteInstruction[instruction]; i++) {
    cicles++;
    currentPosition++;
    printOnCrtRow(cicles, currentPosition);
    if (currentPosition === 39) currentPosition = -1;
  }
  if (value) {
    registerX += parseInt(value);
    drawSprite();
  }
});

// PRINT the screen
crt.map((i) => console.log(i.join("")));
