const path = require('path')
const expect = require('chai').expect

const testfilename = path.basename(__filename, '.spec.js')
const solution = require(path.join('..', 'src', testfilename))

const example = `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ `

describe(`Day ${testfilename}`, () => {
    describe('series of tubes', () => {
        it('follow produces the expected output', () => {
            expect(solution.follow(example).letters).to.be.equal('ABCDEF')
            expect(solution.follow(example).steps).to.be.equal(38)
        })
    })
})
