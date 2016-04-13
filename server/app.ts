///<reference path="../typings/main.d.ts"/>

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';

import * as routes from './routes/index';
import * as db from './db';

import IUser from './models/User';

let port = 20080;
let server = express();

// Configuration

// server.set('views', __dirname + '/views');
// server.set('view engine', 'jade');
// server.set('view options', { layout: false });
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(methodOverride());
server.use(express.static(__dirname + '/../client'));

let env = process.env.NODE_ENV  || 'development';
if (env === 'development') {
  server.use(errorHandler());
}

// Routes

// server.get('/', routes.index);

server.get('/api/users', (req, res) => {
  db.getUsers((users: IUser[]) => {
    res.json(users);
  });
});

server.get('/api/users/:userID', (req, res) => {
  console.log(`getting user ${req.params.userID}`);

  db.getUser(req.params.userID, (user: IUser) => {
    res.json(user);
  });
});

server.listen(port, function () {
  console.log(`Express server listening on porg ${port} in ${server.settings.env} mode`);
});