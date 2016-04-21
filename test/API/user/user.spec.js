'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var request = require('superagent');

const PORT = 8888;
const URI = `http://localhost:${PORT}/api`;
const apiName = 'users';

describe(`API for`, function() {

  describe(`POST /api/${apiName}`, function () {

    let body = {
      firstName: 'Ko',
      lastName: 'Allen',
      userName: 'AllenKo',
      email: 'allen_ko@example.com',
      password: '1qazxsw2'
    };

    before(function (done) {
      done();
    });

    it('should return a 201 response code on success', function (done) {

      request.post(`${URI}/${apiName}`)
        .send(body)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.status).to.equal(201);
          done();
        });

    });

    it('should return JSON', function (done) {

      request.post(`${URI}/${apiName}`)
        .send(body)
        .end(function(e, res) {
          expect(res.header['content-type']).to.equal('application/json; charset=utf-8')

          let resBody = res.body;
          delete resBody['_id'];
          expect(resBody).to.be.a('object');
          expect(resBody).to.eql(body);
          done();
        });

    });

    it('should return a 422 response code if there is a validation error', function (done) {

      request.post(`${URI}/${apiName}`)
        .send({
          firstName: '',
          lastName: 'Allen',
          userName: 'AllenKo',
          email: '',
          password: '1qazxsw2'
        })
        .end(function(e, res) {
          expect(res.status).to.eql(422);

          let resBody = res.body;
          expect(resBody.length).to.eql(2);
          expect(resBody[0]).to.eql('firstName');
          expect(resBody[1]).to.eql('email');
          done();
        });

    });

  });

  // describe(`GET /api/${apiName}/:id`, function () {
  //
  //   it('should return a 200 response code on success', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  //   it('should return JSON', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  //   it('should return a 404 response code if data doesn\'t exist', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  // });
  //
  // describe(`PUT /api/${apiName}/:id`, function () {
  //
  //   it('should return a 200 response code on success', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  //   it('should return JSON', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  //   it('should return a 404 response code if data doesn\'t exist', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  //   it('should return a 422 response code if there is a validation error', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  // });
  //
  // describe(`DELETE /api/${apiName}/:id`, function () {
  //
  //   it('should return a 200 response code on success', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  //   it('should return JSON', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  //   it('should return a 404 response code if data doesn\'t exist', function (done) {
  //     expect(1).to.equal(0);
  //     done();
  //   });
  //
  // });

  // describe(`GET /api/${apiName}`, function () {
  //
  //   it('should return a 200 response', function (done) {
  //     // expect(1).to.equal(2);
  //
  //     request.get(`${URI}/${apiName}`)
  //       .end(function(e, res) {
  //         expect(e).to.equal(null);
  //         expect(res.status).to.equal(200);
  //         expect(res.body.length).to.equal(6);
  //
  //         done()
  //       });
  //
  //   });
  //
  //   it('should return JSON', function (done) {
  //
  //
  //     done();
  //   });
  //
  // });

});
