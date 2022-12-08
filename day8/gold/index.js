const { readFileSync } = require("fs");

const content = readFileSync("./example.txt", "utf-8");

content.split(/\r?\n/).forEach((line) => {
};
