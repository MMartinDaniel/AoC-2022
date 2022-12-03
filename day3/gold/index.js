const {readFileSync } = require('fs');

const content = readFileSync("./input.txt", 'utf-8');

let totalAmount = 0;
const alphabet = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let currentGroup;
let groupLineCount = 0;

content.split(/\r?\n/).forEach((line) => {
    groupLineCount++;

    if(groupLineCount === 1) {
        currentGroup = new Set(line.split(""))
    }else {
        const localSet = new Set()
        line.split("").forEach((i) => {
            if(currentGroup.has(i)) {
                localSet.add(i)
            }
        })
        currentGroup = localSet;
    }

    if(groupLineCount === 3) {
        groupLineCount = 0;
        const [match] = currentGroup
        totalAmount+= alphabet.indexOf(match)

    }
})

console.log(totalAmount)