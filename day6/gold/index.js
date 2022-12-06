const { readFileSync } = require("fs");

const content = readFileSync("./example.txt", "utf-8");

let marker = false;

content.split(/\r?\n/).forEach((line) => {
  const characters = line.split("");

  for (let index = 0; index < characters.length && !marker; index++) {
    const possibleMessageCharacters = new Set();

    for (let subIndex = 0; subIndex < 14; subIndex++) {
      const element = characters[index + subIndex];
      if (element) possibleMessageCharacters.add(element);
    }

    if (possibleMessageCharacters.size !== 14) continue;
    marker = index + 14;
  }
});

console.log(marker);
