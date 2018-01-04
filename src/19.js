const path = require('path')
const utils = require('./utils')

const debug = new require('debug')('aoc')

function parseInput(input) {
    var arr = input.split(/[\r\n]/).map(line => line.split(''))
    return arr
}

function findEntry(arr) {
    return [0, arr[0].indexOf('|')]
}

function inBounds([x, y], xMax, yMax) {
    return x >= 0 && x <= xMax && y >= 0 && y <= yMax
}

function move([x, y], [x1, y1]) {
    return [x + x1, y + y1]
}

function whichWay(pos, direction, arr, xMax, yMax) {
    for (let newDir of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        if (newDir[0] === -direction[0] && newDir[1] === -direction[1]) {
            continue
        }
        let newPos = move(pos, newDir)
        if (!inBounds(newPos, xMax, yMax)) {
            continue
        }
        let char = arr[newPos[0]][newPos[1]]
        if (char !== ' ') {
            return newDir
        }
    }
    throw new Error(`No new direction found at pos ${pos}`)
}

function follow(input) {
    var arr = parseInput(input)
    let pos, xMax, yMax
    pos = findEntry(arr)
    xMax = arr.length - 1
    yMax = arr[0].length - 1
    let letters = ''
    let direction = [1, 0]
    debug(`Starting at pos ${pos}`)
    pos = move(pos, direction)
    let steps = 1
    while (inBounds(pos, xMax, yMax)) {
        let char = arr[pos[0]][pos[1]]
        if (char.match(/[A-Z]/)) {
            letters += char
        }
        if (char === '+') {
            direction = whichWay(pos, direction, arr, xMax, yMax)
        }
        if (char === ' ') {
            break
        }
        debug(`Moved to ${pos}, found ${char}, direction is ${direction}`)
        pos = move(pos, direction)
        steps++
    }
    return {letters, steps}
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'))
    let answer = follow(input)
    console.log('solution to part 1 is', answer.letters)
    console.log('solution to part 2 is', answer.steps)
}

module.exports = {
    run,
    follow
}
