///<reference path="../typings/main.d.ts"/>

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';

import * as routes from './routes/index';
import db from './db';

import IUser from './models/User';

// Configuration
let jsonParser = bodyParser.json();
let port = 20080;
let server = express();
db.connect();

// setup index.html from client/
server.use(express.static(`${__dirname}/../client`));

// setup HTTP body parser
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(methodOverride());

let env = process.env.NODE_ENV  || 'development';
if (env === 'development') {
  server.use(errorHandler());
}

// Routes

server.get('/api/users/nameList', (req, res) => {
  
  let users = db.users();
  users.find({}).toArray((err, docs) => {
    if (err) res.sendStatus(400);
    // console.log(`docs = ${JSON.stringify(docs)}\n\n`);

    let nameList = docs.map((user) => {
      // console.log(`user = ${JSON.stringify(user)}\n\n`);
      return `${user.first_name} ${user.last_name}`
    });
    res.json(nameList);
  });

});

// server.get('/api/users/:userID', (req, res) => {
//   console.log(`getting user ${req.params.userID}`);
//
//   db.getUser(req.params.userID, (user: IUser) => {
//     res.json(user);
//   });
// });

server.listen(port, () => {
  console.log(`Express server listening on porg ${port} in ${server.settings.env} mode`);
});