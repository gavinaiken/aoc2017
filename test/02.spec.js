const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

const spreadsheet1 = `5 1 9 5
7 5 3
2 4 6 8`
const spreadsheet2 = `5 9 2 8
9 4 7 3
3 8 6 5`

describe(`Day ${testfilename}`, () => {
    /*
    For example, given the following spreadsheet:

    5 1 9 5
    7 5 3
    2 4 6 8

    The first row's largest and smallest values are 9 and 1, and their difference is 8.
    The second row's largest and smallest values are 7 and 3, and their difference is 4.
    The third row's difference is 6.

    In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.
     */

    describe('spreadsheet checksum', () => {
        it('matches the first example', () => {
            expect(solution.checksum(spreadsheet1)).to.be.equal(18)
        })
    })

    /*
    For example, given the following spreadsheet:

    5 9 2 8
    9 4 7 3
    3 8 6 5
    In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
    In the second row, the two numbers are 9 and 3; the result is 3.
    In the third row, the result is 2.
    In this example, the sum of the results would be 4 + 3 + 2 = 9.
     */

    describe('spreadsheet checksum2', () => {
        it('matches the first example', () => {
            expect(solution.checksum2(spreadsheet2)).to.be.equal(9)
        })
    })
})
