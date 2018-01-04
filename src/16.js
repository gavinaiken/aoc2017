const path = require('path')
const utils = require('./utils')

const debug = new require('debug')('aoc')

function spin(count, input) {
    let fromEnd = input.splice(input.length - count)
    input.splice(0, 0, ...fromEnd)
    return input
}

function exchange(a, b, input) {
    let progA = input[a]
    input[a] = input[b]
    input[b] = progA
    return input
}

function partner(a, b, input) {
    let idxA = input.indexOf(a)
    let idxB = input.indexOf(b)
    return exchange(idxA, idxB, input)
}

function perform(danceStep) {
    switch (danceStep[0]) {
        case 's': {
            return input => spin(parseInt(danceStep.substr(1)), input)
        }
        case 'x': {
            let pos1, pos2
            [pos1, pos2] = danceStep.substr(1).split('/')
            return input => exchange(parseInt(pos1), parseInt(pos2), input)
        }
        case 'p': {
            let program1, program2
            [program1, program2] = danceStep.substr(1).split('/')
            return input => partner(program1, program2, input)
        }
        default: {
            throw new Error(`Can't parse dance step`)
        }
    }
}

function dance(steps, input) {
    input = input.split('')
    steps.split(',').forEach(step => {
        input = perform(step)(input)
    })
    return input.join('')
}

function getCycleCount(steps, input, iterations) {
    let origInput = input
    for (let i = 1; i < iterations; i++) {
        input = dance(steps, input)
        if (input === origInput) {
            return i
        }
    }
}

function dance2(steps, input, iterations) {
    let cycleCount = getCycleCount(steps, input, iterations)
    let stepsToPerform = iterations % cycleCount

    debug(`Got back to ${input} after ${cycleCount} iterations, need to perform ${stepsToPerform} iterations`)

    for (let i = 0; i < stepsToPerform; i++) {
        input = dance(steps, input)
    }
    return input
}

async function run() {
    const steps = await utils.getInput(path.basename(__filename, '.js'))
    console.log('solution to part 1 is', dance(steps, 'abcdefghijklmnop'))
    console.log('solution to part 2 is', dance2(steps, 'abcdefghijklmnop', 1000000000))
}

module.exports = {
    run,
    dance,
    dance2
}
