const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');

let totalAmount = 0;
const compare = (short,long) => short[0] >= long[0] || short[1] <= long[1] 

content.split(/\r?\n/).forEach((line) => {
  const [firstPair, secondPair] = line.split(",").map((item) => { 
    const i = item.split("-")
    return [parseInt(i[0]), parseInt(i[1])] 
  });

  if(firstPair[1] < secondPair[0] || secondPair[1] < firstPair[0]) return
  
  
  const firstPairLength = firstPair[1] - firstPair[0];
  const secondPairLength = secondPair[1] - secondPair[0];
  
  if( firstPairLength > secondPairLength) {
    if(compare(secondPair, firstPair)) totalAmount++
  } else {
    if(compare(firstPair, secondPair)) totalAmount++;    
  }

})

console.log(totalAmount)