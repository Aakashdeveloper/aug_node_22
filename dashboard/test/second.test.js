let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect
chai.use(chaiHttp);


describe('User Api',() => {
    it('Should Return 200 For Users',(done) => {
        chai.request('http://localhost:9700')
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    }),
    it('Should Return 404 For User',(done) => {
        chai.request('http://localhost:9700')
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404);
            done();
        })
        .catch((err) => {
            throw err;
        })
    }),
    it('Should Return 200 For adduSer',(done) => {
        chai.request('http://localhost:9700')
        .post('/addUser')
        .send({"name":"TestUser","isActive":true})
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
})