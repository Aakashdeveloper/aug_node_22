let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect
chai.use(chaiHttp);


describe('Testing Api',() => {
    it('Should Return 200 For health Check',(done) => {
        chai.request('http://localhost:9700')
        .get('/health')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
})