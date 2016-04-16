///<reference path="../typings/main.d.ts"/>

'use strict';

import * as express from 'express';

import DbUtil from './db';
import setupExpress from './config/express';
import setupRouter from './routes';

// Connect to MongoDB Server
let db = new DbUtil();
db.connectDbServer();

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
