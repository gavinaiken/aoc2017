const path = require('path')
const utils = require('./utils')

const debug = new require('debug')('aoc')

/*
The generators both work on the same principle.
To create its next value, a generator will take the previous
value it produced, multiply it by a factor (generator A uses 16807;
generator B uses 48271), and then keep the remainder of dividing
that resulting product by 2147483647. That final remainder is the
value it produces next.
 */

const factorA = 16807
const factorB = 48271
const divisor = 2147483647

function nextA(prev) {
    return (prev * factorA) % divisor
}

function nextB(prev) {
    return (prev * factorB) % divisor
}

function nextA2(prev) {
    let next = (prev * factorA) % divisor
    while (next % 4 !== 0) {
        next = (next * factorA) % divisor
    }
    return next
}

function nextB2(prev) {
    let next = (prev * factorB) % divisor
    while (next % 8 !== 0) {
        next = (next * factorB) % divisor
    }
    return next
}

function match(a, b) {
    return (a & 0xFFFF) === (b & 0xFFFF)
}

function duelingGenerators(startA, startB, iterations) {
    var matches = 0
    for (let i = 0; i < iterations; i++) {
        let a = nextA(startA)
        let b = nextB(startB)
        if (match(a, b)) { matches++ }
        startA = a
        startB = b
        if (i && i % 1000000 === 0) { debug(`completed ${i} iterations`) }
    }
    return matches
}

function duelingGenerators2(startA, startB, iterations) {
    var matches = 0
    for (let i = 0; i < iterations; i++) {
        let a = nextA2(startA)
        let b = nextB2(startB)
        if (match(a, b)) { matches++ }
        startA = a
        startB = b
        if (i && i % 1000000 === 0) { debug(`completed ${i} iterations`) }
    }
    return matches
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'))
    let a = parseInt(input.split(/[\r\n]/)[0].match(/\d+/)[0])
    let b = parseInt(input.split(/[\r\n]/)[1].match(/\d+/)[0])

    console.log('solution to part 1 is', duelingGenerators(a, b, 40000000))
    console.log('solution to part 2 is', duelingGenerators2(a, b, 5000000))
}

module.exports = {
    run,
    nextA,
    nextB,
    nextA2,
    nextB2,
    match,
    duelingGenerators,
    duelingGenerators2
}
