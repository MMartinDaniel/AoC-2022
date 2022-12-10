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

const ropes = [
  { id: "H", x: 500, y: 500 },
  { id: "1", x: 500, y: 500 },
  { id: "2", x: 500, y: 500 },
  { id: "3", x: 500, y: 500 },
  { id: "4", x: 500, y: 500 },
  { id: "5", x: 500, y: 500 },
  { id: "6", x: 500, y: 500 },
  { id: "7", x: 500, y: 500 },
  { id: "8", x: 500, y: 500 },
  { id: "9", x: 500, y: 500 },
];

traceMap[500][500] = "#"; // starting point

const updateOverlayMap = () => {
  const head = ropes[0];

  for (let i = head.x - ropes.length; i < head.x + ropes.length; i++) {
    for (let j = head.y - ropes.length; j < head.y + ropes.length; j++) {
      overlayMap[i][j] = ".";
    }
  }

  for (let index = ropes.length - 1; index >= 0; index--) {
    const rope = ropes[index];
    overlayMap[rope.x][rope.y] = rope.id;
  }
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

const shouldIMoveAndWhere = (currentRope, nextRope) => {
  if (currentRope.x === nextRope.x && currentRope.y === nextRope.y) return "S";

  // Touching, no movement
  for (let x = currentRope.x - 1; x <= currentRope.x + 1; x++) {
    for (let y = currentRope.y - 1; y <= currentRope.y + 1; y++) {
      if (overlayMap[x][y] && overlayMap[x][y] === nextRope.id) return "S";
    }
  }

  for (let x = currentRope.x - 2; x <= currentRope.x + 2; x++) {
    for (let y = currentRope.y - 2; y <= currentRope.y + 2; y++) {
      if (overlayMap[x][y] && overlayMap[x][y] === nextRope.id) {
        let newMovement;
        if (x === currentRope.x && y === currentRope.y + 2) newMovement = "R";
        else if (x === currentRope.x && y === currentRope.y - 2)
          newMovement = "L";
        else if (y === currentRope.y && x === currentRope.x + 2)
          newMovement = "D";
        else if (y === currentRope.y && x === currentRope.x - 2)
          newMovement = "U";

        if (x === currentRope.x + 2 && y < currentRope.y) newMovement = "DL";
        else if (x === currentRope.x + 2 && y > currentRope.y)
          newMovement = "DR";
        else if (x === currentRope.x - 2 && y < currentRope.y)
          newMovement = "UL";
        else if (x === currentRope.x - 2 && y > currentRope.y)
          newMovement = "UR";
        else if (y === currentRope.y + 2 && x < currentRope.x)
          newMovement = "UR";
        else if (y === currentRope.y - 2 && x > currentRope.x)
          newMovement = "DL";
        else if (y === currentRope.y - 2 && x < currentRope.x)
          newMovement = "UL";
        else if (y === currentRope.y + 2 && x > currentRope.x)
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
    ropes.forEach((rope, i) => {
      if (i === 0) handleMovement(ropes[i], direction);
      else {
        const optimalMovement = shouldIMoveAndWhere(rope, ropes[i - 1]);
        handleMovement(rope, optimalMovement, rope.id === "9");
      }
    });
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
