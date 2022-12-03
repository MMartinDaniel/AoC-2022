const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');

let totalAmount = 0;
const alphabet = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

content.split(/\r?\n/).forEach((line) => {
  const compartmentLength = Math.floor(line.length / 2);
  const firstCompartmentItems = line.slice(0, compartmentLength).split("");
  const secondCompartmentItems = line.slice(compartmentLength).split("");
  const itemInBothCompartments = secondCompartmentItems.find(i => firstCompartmentItems.includes(i))
  console.log(itemInBothCompartments)
  totalAmount += alphabet.indexOf(itemInBothCompartments);

})

console.log(totalAmount)