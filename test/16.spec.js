const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

/*
The programs' dance consists of a sequence of dance moves:

Spin, written sX, makes X programs move from the end to the front, but maintain their order otherwise.
(For example, s3 on abcde produces cdeab).
Exchange, written xA/B, makes the programs at positions A and B swap places.
Partner, written pA/B, makes the programs named A and B swap places.
For example, with only five programs standing in a line (abcde), they could do the following dance:

s1, a spin of size 1: eabcd.
x3/4, swapping the last two programs: eabdc.
pe/b, swapping programs e and b: baedc.

*/

describe(`Day ${testfilename}`, () => {
    describe('dancing programs', () => {
        it('spin produces the expected output', () => {
            expect(solution.dance('s3', 'abcde')).to.be.equal('cdeab')
            expect(solution.dance('s1', 'abcde')).to.be.equal('eabcd')
        })
        it('exchange produces the expected output', () => {
            expect(solution.dance('x3/4', 'eabcd')).to.be.equal('eabdc')
        })
        it('partner produces the expected output', () => {
            expect(solution.dance('pe/b', 'eabdc')).to.be.equal('baedc')
        })
        it('dance produces the expected output', () => {
            expect(solution.dance('s1,x3/4,pe/b', 'abcde')).to.be.equal('baedc')
        })
    })
})
