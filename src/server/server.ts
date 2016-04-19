///<reference path="../../typings/main.d.ts"/>

'use strict';

import * as express from 'express';

import DbUtil from './db';
import seed from './config/seed';
import setupExpress from './config/express';
import setupRouter from './routes';

// Connect to MongoDB Server
let dbUtil = new DbUtil();
dbUtil.connectDbServer(seed);

// Populate databases with sample data
// seed(db);

// Setup server
let app = express();
var port = process.env.PORT || 20080;

// Setup express
// require('./config/express').default(app);
setupExpress(app);

// Routes
// require('./routes').default(app, db);
setupRouter(app, dbUtil);

// Start server
app.listen(port, () => {
  console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
});

// Expose app
exports = module.exports = app;
