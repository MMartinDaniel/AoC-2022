const {readFileSync } = require('fs');


const stacks =  [[],["Z","N"],["M","C","D"],["P"]]
//NOTE: Modified input
const content = readFileSync("./example.txt", 'utf-8');


content.split(/\r?\n/).forEach((line) => {
  const [_1, amount,_2, from, _3 , to] = line.split(" ")
  for(let i = 0; i < amount; i++) {
      let value = stacks[from].pop()
      stacks[to].push(value) 
  }
})
