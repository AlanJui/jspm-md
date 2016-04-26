///<reference path="./_server.d.ts"/>

'use strict';

import * as express from 'express';

import * as db from './db';
import seed from './config/seed';
import setupExpress from './config/express';
import routes from './routes';

// Connect to MongoDB Server
// env = development || staging || test || production
let url = null;
let env = process.env.NODE_ENV;
if (env === 'test' || env === 'development' ) {
  // Populate databases with sample data
  url = 'mongodb://localhost:27017/mydb-test';
  db.setURL(url);
  seed(url);
} else {
  url = 'mongodb://localhost:27017/mydb';
  db.setURL(url);
}

// Setup server
let app = express();
var port = process.env.PORT || 20080;

// Setup express
setupExpress(app);

// Routes
routes(app);

// Start server
app.listen(port, () => {
  console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
});

// Expose app
exports = module.exports = app;
