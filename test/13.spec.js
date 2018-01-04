const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

/*
0: 3
1: 2
4: 4
6: 4

severity is 0*3 + 6*4 = 24.
 */

const example = `0: 3
1: 2
4: 4
6: 4`

describe(`Day ${testfilename}`, () => {
    describe('firewall scanner 1', () => {
        it('matches the first example', () => {
            expect(solution.tripSeverity(example)).to.be.equal(24)
        })
    })

    describe('firewall scanner 2', () => {
        it('matches the second example', () => {
            expect(solution.tripSeverity2(example)).to.be.equal(10)
        })
    })
})
