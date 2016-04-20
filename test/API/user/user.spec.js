var expect = require('chai').expect;
var request = require('superagent')

const PORT = 8888;
const URI = `http://localhost:${PORT}/api`;
const apiName = 'users';

describe(`API for ${apiName}`, function() {

  describe(`GET /api/${apiName}`, function () {

    it('should return a 200 response', function (done) {
      // expect(1).to.equal(2);

      request.get(`${URI}/${apiName}`)
        .end(function(e, res) {
          expect(e).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(6);

          done()
        });

    });

    it('should return JSON', function (done) {
      expect(1).to.equal(1);
      done();
    });

  });

  describe(`POST /api/${apiName}`, function () {

    it('should return a 200 response code on success', function (done) {

//       request.post(urlBase + '/users')
//         .send({
//           firstName: 'Ko',
//           lastName: 'Allen',
//           userName: 'AllenKo',
//           email: 'allen_ko@example.com',
//           password: '1qazxsw2'
//         })
//         .end(function(e, res) {
// //        console.log(res.body);
//           expect(e).to.eql(null)
//           expect(res.status).to.eql(200)
//           id = res.body._id
//           done()
//         });
      expect(1).to.equal(0);
      done();
    });

    it('should return JSON', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return a 422 response code if there is a validation error', function (done) {
      expect(1).to.equal(0);
      done();
    });

  });

  describe(`GET /api/${apiName}/:id`, function () {

    it('should return a 200 response code on success', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return JSON', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return a 404 response code if data doesn\'t exist', function (done) {
      expect(1).to.equal(0);
      done();
    });

  });

  describe(`PUT /api/${apiName}/:id`, function () {

    it('should return a 200 response code on success', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return JSON', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return a 404 response code if data doesn\'t exist', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return a 422 response code if there is a validation error', function (done) {
      expect(1).to.equal(0);
      done();
    });

  });

  describe(`DELETE /api/${apiName}/:id`, function () {

    it('should return a 200 response code on success', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return JSON', function (done) {
      expect(1).to.equal(0);
      done();
    });

    it('should return a 404 response code if data doesn\'t exist', function (done) {
      expect(1).to.equal(0);
      done();
    });

  });

});
