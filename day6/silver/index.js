const { readFileSync } = require("fs");

const content = readFileSync("./example.txt", "utf-8");

let marker = false;

content.split(/\r?\n/).forEach((line) => {
  const characters = line.split("");

  for (let index = 0; index < characters.length && !marker; index++) {
    const [a, b, c, d] = [
      characters[index],
      characters[index + 1],
      characters[index + 2],
      characters[index + 3],
    ];

    if (!a || !b || !c || !d) continue;

    if (a !== b && a !== c && a !== d && b !== c && b !== d && c !== d) {
      marker = index + 4;
    }
  }
});

console.log(marker);
