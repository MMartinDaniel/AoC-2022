const { readFileSync } = require("fs");

const content = readFileSync("./input.txt", "utf-8");

const MAP_SIZE_X = 1000;
const MAP_SIZE_Y = 1000;
const traceMap = [];
const overlayMap = [];

for (let i = 0; i < MAP_SIZE_X; i++) {
  traceMap[i] = [];
  overlayMap[i] = [];
  for (let j = 0; j < MAP_SIZE_Y; j++) {
    traceMap[i][j] = ".";
    overlayMap[i][j] = ".";
  }
}

let startPosition = { x: 500, y: 500 };
let tailPosition = { x: 500, y: 500 };
let headPosition = { x: 500, y: 500 };

overlayMap[headPosition.x][headPosition.y] = "H";
overlayMap[tailPosition.x][tailPosition.y] = "T";
traceMap[startPosition.x][startPosition.y] = "#";

const updateOverlayMap = () => {
  for (let i = tailPosition.x - 4; i < tailPosition.x + 4; i++) {
    for (let j = tailPosition.y - 4; j < tailPosition.y + 4; j++) {
      overlayMap[i][j] = ".";
    }
  }
  overlayMap[headPosition.x][headPosition.y] = "H";
  overlayMap[tailPosition.x][tailPosition.y] = "T";
  overlayMap[startPosition.x][startPosition.y] = "s";
};

const handleMovement = (tailOrHead, direction, shouldTrace) => {
  switch (direction) {
    case "S": // STAY
      break;
    case "R":
      tailOrHead.y += 1;
      break;
    case "L":
      tailOrHead.y -= 1;
      break;
    case "U":
      tailOrHead.x -= 1;
      break;
    case "D":
      tailOrHead.x += 1;
      break;
    case "UR":
      tailOrHead.x -= 1;
      tailOrHead.y += 1;
      break;
    case "UL":
      tailOrHead.x -= 1;
      tailOrHead.y -= 1;
      break;
    case "DR":
      tailOrHead.x += 1;
      tailOrHead.y += 1;
      break;
    case "DL":
      tailOrHead.x += 1;
      tailOrHead.y -= 1;
  }
  if (shouldTrace) traceMap[tailOrHead.x][tailOrHead.y] = "#";
  updateOverlayMap();
};

const shouldIMoveAndWhere = (tailPosition) => {
  if (tailPosition.x === headPosition.x && tailPosition.y === headPosition.y)
    return "S";

  // Touching, no movement
  for (let x = tailPosition.x - 1; x <= tailPosition.x + 1; x++) {
    for (let y = tailPosition.y - 1; y <= tailPosition.y + 1; y++) {
      if (overlayMap[x][y] && overlayMap[x][y] === "H") return "S";
    }
  }

  for (let x = tailPosition.x - 2; x <= tailPosition.x + 2; x++) {
    for (let y = tailPosition.y - 2; y <= tailPosition.y + 2; y++) {
      if (overlayMap[x][y] && overlayMap[x][y] === "H") {
        let newMovement;
        if (x === tailPosition.x && y === tailPosition.y + 2) newMovement = "R";
        else if (x === tailPosition.x && y === tailPosition.y - 2)
          newMovement = "L";
        else if (y === tailPosition.y && x === tailPosition.x + 2)
          newMovement = "D";
        else if (y === tailPosition.y && x === tailPosition.x - 2)
          newMovement = "U";

        if (x === tailPosition.x + 2 && y < tailPosition.y) newMovement = "DL";
        else if (x === tailPosition.x + 2 && y > tailPosition.y)
          newMovement = "DR";
        else if (x === tailPosition.x - 2 && y < tailPosition.y)
          newMovement = "UL";
        else if (x === tailPosition.x - 2 && y > tailPosition.y)
          newMovement = "UR";
        else if (y === tailPosition.y + 2 && x < tailPosition.x)
          newMovement = "UR";
        else if (y === tailPosition.y - 2 && x > tailPosition.x)
          newMovement = "DL";
        else if (y === tailPosition.y - 2 && x < tailPosition.x)
          newMovement = "UL";
        else if (y === tailPosition.y + 2 && x > tailPosition.x)
          newMovement = "DR";

        return newMovement;
      }
    }
  }

  return "S";
};

content.split(/\r?\n/).forEach((line) => {
  const [direction, steps] = line.split(" ");
  for (let i = 0; i < steps; i++) {
    handleMovement(headPosition, direction);
    const optimalMovement = shouldIMoveAndWhere(tailPosition);
    handleMovement(tailPosition, optimalMovement, true);
  }
});

const amountOfVisitedNodes = (map) => {
  let amount = 0;
  for (let i = 0; i < MAP_SIZE_X; i++) {
    const row = map[i];
    amount += row.reduce((acc, cur) => (cur === "#" ? acc + 1 : acc), 0);
  }
  return amount;
};

console.log(amountOfVisitedNodes(traceMap));
