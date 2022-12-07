const { readFileSync } = require("fs");

const content = readFileSync("./input.txt", "utf-8");

const HARD_DRIVE_CAPACITY = 70_000_000;
const SPACE_TO_DELETE = 30_000_000;

let directories = {};
let currentPath = "";

const directoryInDirectories = (path) => !!directories[path];

const removeLastPath = (path) => path.slice(0, path.lastIndexOf("/"));
const cd = (argument) => {
  switch (argument) {
    case "/":
      if (!directoryInDirectories("/")) directories["/"] = 0;
      currentPath = "/";
      break;
    case "..":
      currentPath = removeLastPath(currentPath);
      break;
    default:
      const newPath =
        currentPath === "/"
          ? `${currentPath}${argument}`
          : `${currentPath}/${argument}`;

      if (!directoryInDirectories(newPath)) directories[newPath] = 0;
      currentPath = newPath;
      break;
  }
};

content.split(/\r?\n/).forEach((line) => {
  const consoleOutput = line.split(" ");
  const prompt = consoleOutput[0];

  if (prompt === "$") {
    const [_, command, argument] = consoleOutput;
    if (command === "cd") cd(argument);
  } else {
    const [sizeOrDir, _] = consoleOutput;
    if (!sizeOrDir.startsWith("dir"))
      directories[currentPath] += parseInt(sizeOrDir);
  }
});

const calculateSizes = () => {
  const sortedKeys = Object.keys(directories).sort(
    (a, b) => b.length - a.length
  );

  sortedKeys.forEach((key) => {
    if (key !== "/") {
      let prevPath = removeLastPath(key);
      if (prevPath === "") prevPath = "/";
      directories[prevPath] += directories[key];
    }
  });

  const to_free = Math.abs(
    HARD_DRIVE_CAPACITY - directories["/"] - SPACE_TO_DELETE
  );

  const sortedValues = [to_free, ...Object.values(directories)].sort(
    (a, b) => a - b
  );

  return sortedValues[sortedValues.indexOf(to_free) + 1];
};

console.log(calculateSizes());
