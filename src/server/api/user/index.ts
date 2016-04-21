///<reference path="../../_server.d.ts"/>

'use strict';

import * as express from 'express';
import * as mongodb from 'mongodb';
import * as _ from 'lodash';

export default function(dbConnect) {

  let router = express.Router();
  let COLLECTION_NAME: string = 'users';

  router.get('/nameList', getNameList);

  router.route('/')
    .get(list)
    .post(create);
  
  router.use('/:id', getById);
  router.route('/:id')
    .get(read)
    .put(update)
    .delete(del);

// ==========================================================

  function isEmpty(value) {
    return (value == null || value.length === 0)
  }

  function list(req, res) {

    let collection = dbConnect.getCollection(COLLECTION_NAME);
    collection.find({}).toArray((err, docs) => {
      if (err) res.sendStatus(400);
      // console.dir(`docs = ${JSON.stringify(docs)}\n\n`);

      res.json(docs);
    });

  }

  function create(req, res) {

    let fields = ['firstName', 'lastName', 'email'];
    let emptyFields = [];

    for (let i=0; i < fields.length; ++i) {
      let key = fields[i];
      let value = req.body[key];
      if (isEmpty(value)) {
        emptyFields.push(key);
      }
    }

    if (emptyFields.length !== 0) {
      return res.status(422).json(emptyFields);
    }

    let collection = dbConnect.getCollection(COLLECTION_NAME);
    collection.insert(req.body, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      
      res.status(201).json(result.ops[0]);
    });
  }
  
  function getById(req, res, next) {
    let collection = dbConnect.getCollection(COLLECTION_NAME);
    next();
  }

  function read(req, res) {

  }

  function update(req, res) {

  }

  function del(req, res) {

  }



  function getNameList(req, res) {
    // API: /api/users/nameList
    let users = dbConnect.getCollection('users');
    users.find({}).toArray((err, docs) => {
      if (err) res.sendStatus(400);
      // console.log(`docs = ${JSON.stringify(docs)}\n\n`);

      let nameList = docs.map((user) => {
        // console.log(`user = ${JSON.stringify(user)}\n\n`);
        return `${user.firstName} ${user.lastName}`
      });
      res.json(nameList);
    });

  }

// server.get('/api/users/:userID', (req, res) => {
//   console.log(`getting user ${req.params.userID}`);
//
//   db.getUser(req.params.userID, (user: IUser) => {
//     res.json(user);
//   });
// });

  return router;
}

