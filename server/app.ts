///<reference path="../typings/main.d.ts"/>
///<reference path="./db.ts"/>


'use strict';

import * as express from 'express';

import setupExpress from './config/express';
import setupRouter from './routes';

import IUser from './models/User';

// Connect to MongoDB Server
let db = require('./db');
db.connect();

// Setup server
let app = express();
let port = 20080;

// Setup express
// require('./config/express').default(app);
setupExpress(app);

// Routes
// require('./routes').default(app, db);
setupRouter(app, db);

// Start server
app.listen(port, () => {
  console.log(`Express server listening on porg ${port} in ${app.settings.env} mode`);
});

// Expose app
exports = module.exports = app;
