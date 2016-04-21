///<reference path="./_server.d.ts"/>

'use strict';

import * as express from 'express';

import DbConnect from './db';
import seed from './config/seed';
import setupExpress from './config/express';
import setupRouter from './routes';

// Connect to MongoDB Server
let dbConnect = new DbConnect();
dbConnect.connectServer();

// Populate databases with sample data
// seed(dbConnect);

// Setup server
let app = express();
var port = process.env.PORT || 20080;

// Setup express
// require('./config/express').default(app);
setupExpress(app);

// Routes
// require('./routes').default(app, db);
setupRouter(app, dbConnect);

// Start server
app.listen(port, () => {
  console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
});

// Expose app
exports = module.exports = app;
