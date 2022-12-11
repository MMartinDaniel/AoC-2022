const { readFileSync } = require("fs");
 
// Ugly solution
class Monkey {
    constructor(id, items, operator, operand, divisibleBy, success, failure) {
        this.id = id
        this.items = items
        this.parsed = 0
        this.operation = {
            operator,
            operand
        }
        this.statement = {
            divideBy: divisibleBy,
            success,
            failure
        }
    }
    
    inspect() {
        this.items = this.items.map((i) => this.calculateWorryLevel(i))
        this.parsed += this.items.length
    }
    calculateWorryLevel(i) {
        let newWorryLevel = 0
        const operand = (this.operation.operand  === "old") ? i : parseInt(this.operation.operand)

        if( this.operation.operator === "*") newWorryLevel = i * operand
        else newWorryLevel = i + operand
        return newWorryLevel
    }

    throwToMonkey () {
        this.items.forEach(item => {
            let monkey
            if(item % this.statement.divideBy === 0) {
                monkey = monkeys.find(m => m.id === this.statement.success)
            }else {
                monkey = monkeys.find(m => m.id === this.statement.failure)
            }
            const newValueItem = item % z;
            monkey.items.push(newValueItem)
        })
        this.items = []
    }

}

const monkeys = []
let z
const getIntegerInLine = (line) => line.match(/\d+/g).map(i => parseInt(i)) 

const content = readFileSync("./input.txt", "utf-8").split(/\r?\n/)
content.forEach((line,i) => {
    if(!line.startsWith("Monkey")) return
    const id = getIntegerInLine(line)[0]
    const items = getIntegerInLine(content[i+1])
    const [_, operator, op2] = content[i+2].split("= ")[1].split(" ")
    const divisibleBy = getIntegerInLine(content[i+3])[0]
    const trueToMonkey = getIntegerInLine(content[i+4])[0]
    const falseToMonkey = getIntegerInLine(content[i+5])[0]
    monkeys.push(new Monkey(id, items, operator, op2, divisibleBy, trueToMonkey, falseToMonkey))
})

z = (monkeys.reduce((acc,cur) => acc * cur.statement.divideBy,1))

for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => {
        monkey.inspect()
        monkey.throwToMonkey()
    })  
}

console.log(monkeys)
monkeys.sort((a,b) => b.parsed - a.parsed)
console.log(monkeys.slice(0,2).reduce((acc, curr) => acc * curr.parsed,1))
 