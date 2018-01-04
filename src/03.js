const path = require('path')
const utils = require('./utils')

/*
Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...

y
^
|
  -> x

1 right
1 up
2 left
2 down
3 right
3 up
4 left
4 down
5 right
 */

function manhattan(vector) {
    return vector.reduce((acc, curr) => {
        acc += Math.abs(curr)
        return acc
    }, 0)
}

function spiral(iterations) {
    let positions = {}
    let currPos = [0, 0]
    let dir = [1, 0]
    let i = 1
    let movesInCurrDirection = 0
    let currLength = 1
    let changeLength = false

    while (i <= iterations) {
        positions[i] = {i, pos: [currPos[0], currPos[1]], m: manhattan(currPos)}
        currPos[0] += dir[0]
        currPos[1] += dir[1]
        movesInCurrDirection++
        if (movesInCurrDirection === currLength) {
            dir = [-dir[1], dir[0]] // rotate vector anticlockwise
            movesInCurrDirection = 0
            if (changeLength) {
                currLength++
                changeLength = false
            } else {
                changeLength = true
            }
        }
        i++
    }
    return positions
}

function getAdjacentVals(pos, vals) {
    let sum = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) { continue }
            let adjacentPos = [pos[0] + i, pos[1] + j]
            let val = vals[adjacentPos.join(',')]
            if (val) {
                sum += val.val
            }
        }
    }
    return sum || 1
}

function spiral2(iterations, breakAt) {
    let positions = {}
    let currPos = [0, 0]
    let dir = [1, 0]
    let i = 1
    let movesInCurrDirection = 0
    let currLength = 1
    let changeLength = false

    while (i <= iterations) {
        let posStr = currPos.join(',')
        let val = getAdjacentVals(currPos, positions)
        positions[posStr] = {i, pos: [currPos[0], currPos[1]], m: manhattan(currPos), val}
        if (val > breakAt) {
            return val
        }
        currPos[0] += dir[0]
        currPos[1] += dir[1]
        movesInCurrDirection++
        if (movesInCurrDirection === currLength) {
            dir = [-dir[1], dir[0]] // rotate vector anticlockwise
            movesInCurrDirection = 0
            if (changeLength) {
                currLength++
                changeLength = false
            } else {
                changeLength = true
            }
        }
        i++
    }
    console.log(positions)
    return positions
}

async function run() {
    var input = await utils.getInput(path.basename(__filename, '.js'))
    input = parseInt(input)
    console.log('solution to part 1 is', spiral(input)[input].m)
    console.log('solution to part 2 is', spiral2(100000, input))
}

module.exports = {
    run,
    spiral,
    spiral2
}
