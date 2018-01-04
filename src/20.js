const path = require('path')
const utils = require('./utils')

const debug = new require('debug')('aoc')

/*
p=<-833,-499,-1391>, v=<84,17,61>, a=<-4,1,1>
p=<-168,3586,-2721>, v=<-61,-58,61>, a=<7,-13,8>
p=<364,223,1877>, v=<31,-11,-71>, a=<-5,0,-3>

Each tick, all particles are updated simultaneously. A particle's properties are updated in the following order:

Increase the X velocity by the X acceleration.
Increase the Y velocity by the Y acceleration.
Increase the Z velocity by the Z acceleration.
Increase the X position by the X velocity.
Increase the Y position by the Y velocity.
Increase the Z position by the Z velocity.
 */

function removeCollisions(input) {
    var seen = {}
    input.forEach(particle => {
        let posStr = particle.p.join(',')
        seen[posStr] = seen[posStr] || 0
        seen[posStr]++
    })
    return input.filter(particle => {
        let posStr = particle.p.join(',')
        if (seen[posStr] > 1) { return false }
        return true
    })
}

function tick(input) {
    for (let particle of input) {
        for (let i of [0, 1, 2]) {
            particle.v[i] += particle.a[i]
            particle.p[i] += particle.v[i]
        }
    }
}

function manhattan(vector) {
    return vector.reduce((acc, curr) => {
        acc += Math.abs(curr)
        return acc
    }, 0)
}

function parseInput(input) {
    var lines = input.split(/[\r\n]/)
    var particles = lines.map((line, idx) => {
        var nums = line.match(/[-\d]+/g).map(v => parseInt(v))
        var p = nums.slice(0, 3),
            v = nums.slice(3, 6),
            a = nums.slice(6, 9)
        return { idx, p, v, a, pM: manhattan(p), vM: manhattan(v), aM: manhattan(a) }
    })
    return particles
}

function closestToOrigin(input) {
    input = parseInput(input)
    return input.sort((a, b) => {
        if (a.aM - b.aM !== 0) { return a.aM - b.aM }
        if (a.vM - b.vM !== 0) { return a.vM - b.vM }
        if (a.pM - b.pM !== 0) { return a.pM - b.pM }
        return a.idx - b.idx
    })[0]
}

function simulate(input, iterations) {
    input = parseInput(input)
    let i = 0
    while (i < iterations) {
        let startLen = input.length
        input = removeCollisions(input)
        if (input.length < startLen) {
            debug(`Removed ${startLen - input.length} particles at step ${i}, ${input.length} remaining`)
        }
        tick(input)
        i++
    }
    return input
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'))
    console.log('solution to part 1 is', closestToOrigin(input).idx)
    const left = simulate(input, 10000)
    console.log('solution to part 2 is', left.length)
}

module.exports = {
    run,
    closestToOrigin,
    simulate
}
