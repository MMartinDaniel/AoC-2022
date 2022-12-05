const { readFileSync } = require("fs");

const content = readFileSync("./input.txt", "utf-8");

const parseLine = (splittedLine) => {
  const outputValues = [];
  let currentLength = 0;

  for (let index = 0; index < splittedLine.length; index++) {
    const element = splittedLine[index];

    if (element === "" && currentLength + 1 === 4) {
      outputValues.push("_");
      currentLength = 0;
    } else if (element === "") currentLength++;
    else {
      outputValues.push(element[1]);
      currentLength = 0;
    }
  }

  return outputValues;
};

const fillStacks = () => {
  stackData = stackData.slice(0, -2);
  for (let index = stackData.length - 1; index >= 0; index--) {
    const elementArray = stackData[index];
    for (let elIndex = 0; elIndex < elementArray.length; elIndex++) {
      if (!stacks[elIndex]) stacks[elIndex] = [];
      if (elementArray[elIndex] !== "_")
        stacks[elIndex].push(elementArray[elIndex]);
    }
  }
  stacks.unshift([]);
};

const stacks = [];
let stackData = [];
let dataLoaded = false;

content.split(/\r?\n/).forEach((line) => {
  const splitLine = line.split(" ");

  if (!splitLine[0].startsWith("move")) {
    const stackLine = parseLine(splitLine);
    stackData.push(stackLine);
  } else {
    if (!dataLoaded) {
      fillStacks();
      dataLoaded = true;
    }
    const [_1, amount, _2, from, _3, to] = line.split(" ");
    const pile = stacks[from].slice(-amount);
    stacks[from] = stacks[from].slice(0, -amount);
    stacks[to] = stacks[to].concat(pile);
  }
});

const solution = stacks.reduce(
  (acc, cur) => (cur.length !== 0 ? `${acc}${cur.pop()}` : acc),
  ""
);

console.log(solution);
