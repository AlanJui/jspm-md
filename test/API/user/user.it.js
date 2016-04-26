'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var request = require('superagent');

const PORT = 8888;
const URI = `http://localhost:${PORT}/api`;
const apiName = 'users';

function removeID(resData) {
  delete resData['_id'];
  return resData;
}

describe(`API for`, function() {
  let _id;
  let reqBody;

  describe(`POST /api/${apiName}`, function () {

    beforeEach(function (done) {
      reqBody = {
        firstName: 'Ko',
        lastName: 'Allen',
        userName: 'AllenKo',
        email: 'allen_ko@example.com',
        password: '1qazxsw2'
      };

      done();
    });

    it('should return a 201 response code on success', function (done) {

      request.post(`${URI}/${apiName}`)
        .send(reqBody)
        .end(function(e, res) {
          
          // No Error
          expect(e).to.be.null;
          // e.should.to.be.a('null');

          // Status Code
          // expect(res.status).to.equal(201);
          (res.status).should.equal(201);

          // should return JSON
          //expect(res.header['content-type']).to.equal('application/json; charset=utf-8');
          (res.header['content-type']).should.have.string('application/json;');

          // let resBody = res.body;
          // delete resBody['_id'];
          _id = res.body._id;
          let resBody = removeID(res.body);

          //expect(resBody).to.be.a('object');
          resBody.should.be.a('object');

          //expect(resBody).to.eql(body);
          resBody.should.eql(reqBody);

          done();
        });

    });

    it('should return a 422 response code if there is a validation error', function (done) {

      reqBody = {
        firstName: '',
        lastName: 'Allen',
        userName: 'AllenKo',
        email: '',
        password: '1qazxsw2'
      };

      request.post(`${URI}/${apiName}`)
        .send(reqBody)
        .end(function(e, res) {
          // expect(res.status).to.eql(422);
          (res.status).should.eql(422);
          
          let resBody = res.body;
          // expect(resBody.length).to.eql(2);
          (resBody.length).should.eql(2);

          // expect(resBody[0]).to.eql('firstName');
          (resBody[0]).should.eql('firstName');

          // expect(resBody[1]).to.eql('email');
          (resBody[1]).should.eql('email');

          done();
        });

    });

  });

  describe(`GET /api/${apiName}/:id`, function () {

    it('should return a 200 response code on success', function (done) {

      let user = {
        firstName: 'Ko',
        lastName: 'Allen',
        userName: 'AllenKo',
        email: 'allen_ko@example.com',
        password: '1qazxsw2'
      };

      let path = `${URI}/${apiName}/${_id}`;
      request.get(path)
        .end(function(e, res) {
          expect(e).to.be.null;

          (res.header['content-type']).should.have.string('application/json');
          (res.status).should.eql(200);

          let obj = removeID(res.body);
          obj.should.eql(user);

          done();
        });

    });

    it('should return a 404 response code if data doesn\'t exist', function (done) {

      let path = `${URI}/${apiName}/AAAAAAAAAAAA`;
      request.get(path)
        .end(function(e, res) {
          expect(e).not.to.be.null;
          (e.message).should.have.string('Not Found');
          (e.response.error.text).should.have.string('User not found!');

          (res.status).should.eql(404);

          done();
        });

    });

  });

  describe(`PUT /api/${apiName}/:id`, function () {

    let update = {
      firstName: 'Zheng-zhung',
      lastName: 'Ju',
      userName: 'JuZhengZhung',
      email: 'JuZehengZhung@google.com',
      password: '5rdxzaq1'
    };

    it('should return a 200 response code on success', function (done) {

      let path = `${URI}/${apiName}/${_id}`;
      request.put(path)
        .send(update)
        .end(function(e, res) {
          expect(e).to.be.null;
          (res.status).should.eql(200);

          done();
        });

    });

    it('should update data successfully', function (done) {

      let path = `${URI}/${apiName}/${_id}`;
      request.get(path)
        .end(function(e, res) {
          expect(e).to.be.null;
          (res.status).should.eql(200);

          let obj = removeID(res.body);
          obj.should.eql(update);

          done();
        });

    });

    it('should return a 404 response code if data doesn\'t exist', function (done) {

      let path = `${URI}/${apiName}/AAAAAAAAAAAA`;
      request.put(path)
        .send(reqBody)
        .end(function(e, res) {
          expect(e).not.to.be.null;
          (e.message).should.have.string('Not Found');

          (res.status).should.eql(404);

          done();
        });

    });

    it('should return a 422 response code if there is a validation error', function (done) {

      let reqBody = {
        firstName: '',
        lastName: 'Allen',
        userName: 'AllenKo',
        email: '',
        password: '1qazxsw2'
      };

      let path = `${URI}/${apiName}/${_id}`;
      request.put(path)
        .send(reqBody)
        .end(function(e, res) {
          expect(e).not.to.be.null;

          (res.status).should.eql(422);

          let resBody = res.body;
          (resBody.length).should.eql(2);
          (resBody[0]).should.eql('firstName');
          (resBody[1]).should.eql('email');

          done();
        });

    });

  });

  describe(`DELETE /api/${apiName}/:id`, function () {

    it('should return a 200 response code on success', function (done) {

      let path = `${URI}/${apiName}/${_id}`;
      request.delete(path)
        .end(function(e, res) {
          expect(e).to.be.null;
          (res.status).should.eql(200);

          done();
        });

    });

    it('should return a 404 response code if data doesn\'t exist', function (done) {

      let path = `${URI}/${apiName}/AAAAAAAAAAAA`;
      request.delete(path)
        .end(function(e, res) {
          expect(e).not.to.be.null;
          (res.status).should.eql(404);

          done();
        });

    });

  });

  describe(`GET /api/${apiName}`, function () {

    it('should return a 200 response', function (done) {

      request.get(`${URI}/${apiName}`)
        .end(function(e, res) {
          expect(e).to.equal(null);
          (res.header['content-type']).should.have.string('application/json');
          (res.status).should.eql(200);
          (res.body.length).should.above(6);
          console.log(`docs = ${res.body.length}`)
          done()
        });

    });

  });

});
