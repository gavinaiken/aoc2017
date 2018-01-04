const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

/*
aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.
 */

/*
For added security, yet another system policy has been put in place.
 Now, a valid passphrase must contain no two words that are anagrams
 of each other - that is, a passphrase is invalid if any word's letters
 can be rearranged to form any other word in the passphrase.

For example:

abcde fghij is a valid passphrase.
abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
iiii oiii ooii oooi oooo is valid.
oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
 */

const example = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`

const example2 = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`

describe(`Day ${testfilename}`, () => {
    describe('isValid', () => {
        it('produces the expected output', () => {
            expect(solution.isValid('aa bb cc dd ee')).to.be.true
            expect(solution.isValid('aa bb cc dd aa')).to.be.false
            expect(solution.isValid('aa bb cc dd aaa')).to.be.true
        })
    })

    describe('countValid', () => {
        it('produces the expected output', () => {
            expect(solution.countValid(solution.parseInput(example))).to.be.equal(2)
        })
    })

    describe('anagramIsValid', () => {
        it('produces the expected output', () => {
            expect(solution.anagramIsValid('abcde fghij')).to.be.true
            expect(solution.anagramIsValid('abcde xyz ecdab')).to.be.false
            expect(solution.anagramIsValid('a ab abc abd abf abj')).to.be.true
            expect(solution.anagramIsValid('iiii oiii ooii oooi oooo')).to.be.true
            expect(solution.anagramIsValid('oiii ioii iioi iiio')).to.be.false
        })
    })

    describe('anagramCountValid', () => {
        it('produces the expected output', () => {
            expect(solution.anagramCountValid(solution.parseInput(example2))).to.be.equal(3)
        })
    })
})

