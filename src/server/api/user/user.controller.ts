///<reference path="../../_server.d.ts"/>

import * as mongo from 'mongodb';

import * as db from '../../db';

const COLLECTION_NAME: string = 'users';

function isEmpty(value) {

  return (value == null || value.length === 0);

}

function removeDocID(doc) {
  let obj = doc;
  delete obj['_id'];
  return obj;
}

export function checkEmptyFields(reqBody) {

  let fields = ['firstName', 'lastName', 'email'];
  let emptyFields = [];

  for (let i = 0; i < fields.length; ++i) {
    let key = fields[i];
    let value = reqBody[key];
    if (isEmpty(value)) {
      emptyFields.push(key);
    }
  }

  return emptyFields;

}

export function list(req, res):void {

  db.list(COLLECTION_NAME, (err, docs) => {
    if (err) {
      return res.sendStatus(400);
    }
    res.json(docs);
  })

}

export function create(req, res):void {

  let emptyFields = checkEmptyFields(req.body);
  if (emptyFields.length !== 0) {
    // return res.status(422).json(emptyFields);
    res.status(422);
    res.send(emptyFields);
    return;
  }

  db.insertOneDoc(COLLECTION_NAME, req.body, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(201).json(doc);
  });

}

export function getById(req, res, next) {

  let id = req.params.id;
  db.findDocById(COLLECTION_NAME, id, (err, doc) => {
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

export function read(req, res):void {
  res.json(res.doc);
}

export function update(req, res):void {

  let ID = res.doc._id;

  let updateDoc = removeDocID(req.body);
  let emptyFields = checkEmptyFields(updateDoc);
  if (emptyFields.length !== 0) {
    return res.status(422).json(emptyFields);
  }

  db.updateDocById(COLLECTION_NAME, ID, updateDoc, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send();
  });

}

export function del(req, res):void {

  let ID = res.doc._id;

  db.removeDocById(COLLECTION_NAME, ID, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send();
  });

}

// API: /api/users/nameList
export function getNameList(req, res) {

  db.list(COLLECTION_NAME, (err, docs) => {
    if (err) res.sendStatus(400);

    let nameList = docs.map((user) => {
      return `${user.firstName} ${user.lastName}`
    });
    res.json(nameList);
  });

}



