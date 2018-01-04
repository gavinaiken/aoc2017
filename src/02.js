const path = require('path')
const utils = require('./utils')

function checksum(input) {
    let rows = input.split(/[\r\n]+/)
    let sum = 0
    rows.forEach(row => {
        let vals = row.split(/[ \t]+/).map(v => parseInt(v))
        vals.sort((a, b) => a - b)
        sum += vals[vals.length - 1] - vals[0]
    })
    return sum
}

function checksum2(input) {
    let rows = input.split(/[\r\n]+/)
    let sum = 0
    rows.forEach(row => {
        let vals = row.split(/[ \t]+/).map(v => parseInt(v))
        vals.sort((a, b) => a - b)
        sum += findDividingPair(vals)
    })
    return sum
}

function findDividingPair(sortedVals) {
    for (let i = sortedVals.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            let div = sortedVals[i] / sortedVals[j]
            if (div === parseInt(div)) {
                return div
            }
        }
    }
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'))
    console.log('solution to part 1 is', checksum(input))
    console.log('solution to part 2 is', checksum2(input))
}

module.exports = {
    run,
    checksum,
    checksum2
}
