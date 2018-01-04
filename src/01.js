const path = require('path')
const utils = require('./utils')

function reverseCaptcha(input) {
    let inputChars = input.split('')
    let sum = 0
    for (let i = 0; i < inputChars.length; i++) {
        let j = (i + 1) % inputChars.length
        if (inputChars[i] === inputChars[j]) {
            sum += parseInt(inputChars[i])
        }
    }
    return sum
}

function reverseCaptcha2(input) {
    let inputChars = input.split('')
    let sum = 0
    for (let i = 0; i < inputChars.length; i++) {
        let j = (i + inputChars.length / 2) % inputChars.length
        if (inputChars[i] === inputChars[j]) {
            sum += parseInt(inputChars[i])
        }
    }
    return sum
}

async function run() {
    const input = await utils.getInput(path.basename(__filename, '.js'))
    console.log('solution to part 1 is', reverseCaptcha(input))
    console.log('solution to part 2 is', reverseCaptcha2(input))
}

module.exports = {
    run,
    reverseCaptcha,
    reverseCaptcha2
}
