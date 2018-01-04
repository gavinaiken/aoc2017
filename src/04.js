const path = require('path')
const utils = require('./utils')

function parseInput(input) {
    return input.split(/[\r\n]/)
}

function anagramIsValid(phrase) {
    var words = phrase.split(' ')
    var wordSet = new Set()
    words.forEach(word =>
        wordSet.add(
            word.split('')
                .sort((a, b) => a.localeCompare(b))
                .join('')
        )
    )
    return words.length === wordSet.size
}

function isValid(phrase) {
    var words = phrase.split(' ')
    var wordSet = new Set()
    words.forEach(word => wordSet.add(word))
    return words.length === wordSet.size
}

function countValid(input) {
    return input.filter(phrase => isValid(phrase)).length
}

function anagramCountValid(input) {
    return input.filter(phrase => anagramIsValid(phrase)).length
}

async function run() {
    var input = await utils.getInput(path.basename(__filename, '.js'))
    input = parseInput(input)
    console.log('solution to part 1 is', countValid(input))
    console.log('solution to part 2 is', anagramCountValid(input))
}

module.exports = {
    run,
    parseInput,
    isValid,
    anagramIsValid,
    countValid,
    anagramCountValid
}
