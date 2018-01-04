const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

/*
Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
 */

describe(`Day ${testfilename}`, () => {
    describe('spirals', () => {
        it('spiral produces the expected output', () => {
            let vals = solution.spiral(1024)
            expect(vals[1].m).to.be.equal(0)
            expect(vals[12].m).to.be.equal(3)
            expect(vals[23].m).to.be.equal(2)
            expect(vals[1024].m).to.be.equal(31)
        })

        it('spiral2 produces the expected output', () => {
            expect(solution.spiral2(24, 800)).to.be.equal(806)
        })
    })
})
