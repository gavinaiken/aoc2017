const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

/*
For example, suppose that for starting values, generator A uses 65,
while generator B uses 8921. Then, the first five pairs of generated values are:

--Gen. A--  --Gen. B--
   1092455   430625591
1181022009  1233683848
 245556042  1431495498
1744312007   137874439
1352636452   285222916
*/


describe(`Day ${testfilename}`, () => {
    describe('duelling generators', () => {
        it('nextA generates the expected output', () => {
            expect(solution.nextA(65)).to.be.equal(1092455)
            expect(solution.nextA(1092455)).to.be.equal(1181022009)
            expect(solution.nextA(1181022009)).to.be.equal(245556042)
            expect(solution.nextA(245556042)).to.be.equal(1744312007)
            expect(solution.nextA(1744312007)).to.be.equal(1352636452)
        })
        it('nextB generates the expected output', () => {
            expect(solution.nextB(8921)).to.be.equal(430625591)
            expect(solution.nextB(430625591)).to.be.equal(1233683848)
            expect(solution.nextB(1233683848)).to.be.equal(1431495498)
            expect(solution.nextB(1431495498)).to.be.equal(137874439)
            expect(solution.nextB(137874439)).to.be.equal(285222916)
        })
        it('match matches expected input', () => {
            expect(solution.match(1092455, 430625591)).to.be.false
            expect(solution.match(245556042, 1431495498)).to.be.true
        })
        it('matches the first example', function () {
            this.timeout(600000)
            expect(solution.duelingGenerators(65, 8921, 5)).to.be.equal(1)
            // expect(solution.duelingGenerators(65, 8921, 40000000)).to.be.equal(588)
        })
    })

    /*
--Gen. A--  --Gen. B--
1352636452  1233683848
1992081072   862516352
 530830436  1159784568
1980017072  1616057672
 740335192   412269392
      */

    describe('duelling generators part 2', () => {
        it('nextA2 generates the expected output', () => {
            expect(solution.nextA2(65)).to.be.equal(1352636452)
            expect(solution.nextA2(1352636452)).to.be.equal(1992081072)
            expect(solution.nextA2(1992081072)).to.be.equal(530830436)
            expect(solution.nextA2(530830436)).to.be.equal(1980017072)
            expect(solution.nextA2(1980017072)).to.be.equal(740335192)
        })
        it('nextB2 generates the expected output', () => {
            expect(solution.nextB2(8921)).to.be.equal(1233683848)
            expect(solution.nextB2(1233683848)).to.be.equal(862516352)
            expect(solution.nextB2(862516352)).to.be.equal(1159784568)
            expect(solution.nextB2(1159784568)).to.be.equal(1616057672)
            expect(solution.nextB2(1616057672)).to.be.equal(412269392)
        })
        it('matches the first example', function () {
            this.timeout(600000)
            expect(solution.duelingGenerators2(65, 8921, 5)).to.be.equal(0)
            expect(solution.duelingGenerators2(65, 8921, 5000000)).to.be.equal(309)
        })
    })
})
