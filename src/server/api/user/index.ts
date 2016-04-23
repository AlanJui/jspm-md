///<reference path="../../_server.d.ts"/>

'use strict';

import * as express from 'express';
import * as mongodb from 'mongodb';
import * as _ from 'lodash';

export default function(dbConnect) {

  let router = express.Router();
  let ObjectID = mongodb.ObjectID;
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

    return (value == null || value.length === 0);

  }

  function removeDocID(doc) {
    let obj = doc;
    delete obj['_id'];
    return obj;
  }


  function checkEmptyFields(reqBody) {

    let fields = ['firstName', 'lastName', 'email'];
    let emptyFields = [];

    for (let i=0; i < fields.length; ++i) {
      let key = fields[i];
      let value = reqBody[key];
      if (isEmpty(value)) {
        emptyFields.push(key);
      }
    }

    return emptyFields;

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

    let emptyFields = checkEmptyFields(req.body);
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
    let objectID = new ObjectID(req.params.id);
    collection.findOne({'_id': objectID}, (err, doc) => {
      if (err) {
        res.status(500).send(err);
      } else if (doc) {
        res.doc = doc;
        next();
      } else {
        res.status(404).send('User not found!');
      }
    });

  }

  function read(req, res) {
    res.json(res.doc);
  }

  function update(req, res) {

    let ID = res.doc._id;

    let updateDoc = removeDocID(req.body);
    let emptyFields = checkEmptyFields(updateDoc);
    if (emptyFields.length !== 0) {
      return res.status(422).json(emptyFields);
    }

    let collection = dbConnect.getCollection(COLLECTION_NAME);
    collection.updateOne({'_id': ID}, {$set: updateDoc}, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).send();
    });

  }

  function del(req, res) {

    let ID = res.doc._id;
    let collection = dbConnect.getCollection(COLLECTION_NAME);
    collection.remove({'_id': ID}, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).send();
    });

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

