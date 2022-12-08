const { readFileSync } = require("fs");

const content = readFileSync("./input.txt", "utf-8");

const forest = content
    .split(/\r?\n/)

    .reduce((acc, line,i) => {

        const input = line.split("")
        const row = [...input.map(i => parseInt(i))]
        
        if(acc.columns.length === 0) acc.columns = Array.from({length: row.length}).fill([])
        
        // store reverse
        acc.columns = row.reduce((acc,cur,j) => {
            acc[j] = acc[j].concat([cur])
            return acc
        }, acc.columns)

        return {
            rows: [...acc.rows, row ],
            columns: acc.columns,
            rowsLength: row.length,
            columnsLength: acc.columns.length
        }
    }
,{ rows: [], columns: [], rowsLength: 0, columnsLength: 0})


let highestScenicScore = 0

const calculateScenic = (rowsOrColumns ,height, i, j) => {
    const row = forest[rowsOrColumns][i];

    let blocked = false

    const countScenic = (acc,cur) => {
        if(blocked) return acc
        if(cur < height) return acc + 1
        else {
            blocked = true
            return acc +  1
        }
    }
 
    const leftScenic = row.slice(0,j).reverse().reduce(countScenic,0)
    blocked = false;
    
    const rightScenic = row.slice(j+1,forest.rowsLength).reduce(countScenic,0)
    return leftScenic * rightScenic
};

 for (let i = 1; i < forest.rowsLength -1; i++) {
    const rowItem = forest.rows[i];
    for (let j = 1; j < forest.columnsLength -1; j++) {
        const threeHeight = rowItem[j];
        const rowScenic = calculateScenic("rows",threeHeight,i,j)
        const columnScenic = calculateScenic("columns",threeHeight,j,i)
        
        const totalScenic = rowScenic * columnScenic
        if(totalScenic > highestScenicScore) highestScenicScore = totalScenic
    }
}
console.log(highestScenicScore)