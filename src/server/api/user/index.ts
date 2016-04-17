///<reference path="../../../../typings/main.d.ts"/>

'use strict';

import * as express from 'express';

export default function(db) {
  var router = express.Router();

  router.get('/', index);
  router.get('/nameList', getNameList);

  function index(req, res) {
    // API: /api/users
    let users = db.getCollection('users');
    users.find({}).toArray((err, docs) => {
      if (err) res.sendStatus(400);
      // console.log(`docs = ${JSON.stringify(docs)}\n\n`);

      res.json(docs);
    });
  }

  function getNameList(req, res) {
    // API: /api/users/nameList
    let users = db.getCollection('users');
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

