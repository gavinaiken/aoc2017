const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

/*
1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.
1111 produces 4 because each digit (all 1) matches the next.
1234 produces 0 because no digit matches the next.
91212129 produces 9 because the only digit that matches the next one is the last digit, 9.
 */

describe(`Day ${testfilename}`, () => {
    describe('reverse captcha', () => {
        it('matches the first example', () => {
            expect(solution.reverseCaptcha('1122')).to.be.equal(3)
        })
        it('matches the second example', () => {
            expect(solution.reverseCaptcha('1111')).to.be.equal(4)
        })
        it('matches the third example', () => {
            expect(solution.reverseCaptcha('1234')).to.be.equal(0)
        })
        it('matches the fourth example', () => {
            expect(solution.reverseCaptcha('91212129')).to.be.equal(9)
        })
    })

    /*
    1212 produces 6: the list contains 4 items, and all four digits match the digit 2 items ahead.
    1221 produces 0, because every comparison is between a 1 and a 2.
    123425 produces 4, because both 2s match each other, but no other digit has a match.
    123123 produces 12.
    12131415 produces 4.
     */

    describe('reverse captcha 2', () => {
        it('matches the first example', () => {
            expect(solution.reverseCaptcha2('1212')).to.be.equal(6)
        })
        it('matches the second example', () => {
            expect(solution.reverseCaptcha2('1221')).to.be.equal(0)
        })
        it('matches the third example', () => {
            expect(solution.reverseCaptcha2('123425')).to.be.equal(4)
        })
        it('matches the fourth example', () => {
            expect(solution.reverseCaptcha2('123123')).to.be.equal(12)
        })
        it('matches the fifth example', () => {
            expect(solution.reverseCaptcha2('12131415')).to.be.equal(4)
        })
    })
})
