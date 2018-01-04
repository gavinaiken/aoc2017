const path = require('path')
const utils = require('./utils')

const debug = new require('debug')('aoc')

/*
Position of me during trip = x
Caught by scanner = scanner is in 0 after x seconds

Scanner is at zero after 2x(depth - 1) = t
 */

function parseInput(input) {
    let inputHash = {}
    input.split(/[\r\n]/).forEach(row => {
        let k, v
        [k, v] = row.split(/: +/)
        inputHash[k] = v
    })
    return inputHash
}

function tripSeverity(input) {
    input = parseInput(input)
    let severity = 0
    Object.keys(input).forEach(key => {
        let layer = parseInt(key)
        let depth = parseInt(input[key])
        if (layer % (2 * (depth - 1))  === 0) {
            // console.log(`Caught in layer ${layer}`)
            severity += depth * layer
        }
    })
    return severity
}

function tripCaught(input, delay = 0) {
    for (let key of Object.keys(input)) {
        let layer = parseInt(key)
        let depth = parseInt(input[key])
        if ((layer + delay) % (2 * (depth - 1)) === 0) {
            // console.log(`Caught in layer ${layer} with delay of ${delay}`)
            return true
        }
    }
    return false
}

function tripSeverity2(input) {
    input = parseInput(input)
    let delay = 0
    while (true) {
        let caught = tripCaught(input, delay)
        if (!caught) { return delay }
        delay++
    }
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'))
    console.log('solution to part 1 is', tripSeverity(input))
    console.log('solution to part 2 is', tripSeverity2(input))
}

module.exports = {
    run,
    tripSeverity,
    tripSeverity2
}
