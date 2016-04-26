'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var sinon = require('sinon');

const PORT = 8888;
const URI = `http://localhost:${PORT}/api`;
const apiName = 'users';

// var api = require('../../_build/server/api/user/index.js');
var ctrl = require('../../_build/server/api/user/user.controller.js');

describe('User Controller Tests:', function () {
  
  describe('Post', function () {
    
    it('should not allow required fields are empty on post', function () {

      var req = {
        body: {
          firstName: '',
          lastName: '',
          userName: 'AllenKo',
          email: '',
          password: '1qazxsw2'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      ctrl.create(req, res);

      res.status.calledWith(422).should.equal(true, res.status);
      (res.send.args[0][0]).should.eql(['firstName', 'lastName', 'email']);

    });
    
    it('should be success', function () {

      var req = {
        body: {
          firstName: 'Alan',
          lastName: 'Jui',
          userName: 'AlanJui',
          email: 'alanjui.1960@gmail.com',
          password: '1qazxsw2'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      ctrl.create(req, res);
      
    });
  });

  describe('Get', function () {
    
  });
  
  describe('Put', function () {
    
  });
  
  describe('Delete', function () {
    
  });
  
});