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

let amountOfTreesVisible = (forest.rowsLength - 2) * 2 + forest.rowsLength * 2


const isTreeVisible = (rowsOrColumns ,height, i, j) => {
    const row = forest[rowsOrColumns][i];
    
    const visibleFromLeft = !row.slice(0,j).some(tree => tree >= height)
    const visibleFromRight = !row.slice(j+1,forest.rowsLength).some(tree => tree >= height)

    return visibleFromLeft || visibleFromRight;
};

 for (let i = 1; i < forest.rowsLength -1; i++) {
    const rowItem = forest.rows[i];
    for (let j = 1; j < forest.columnsLength -1; j++) {
        const threeHeight = rowItem[j];
         if (
            isTreeVisible("rows",threeHeight,i,j) ||
            isTreeVisible("columns",threeHeight,j,i)
        ) amountOfTreesVisible++  
    }
}

console.log(amountOfTreesVisible)