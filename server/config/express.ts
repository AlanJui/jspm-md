///<reference path="../../typings/main.d.ts"/>

'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as methodOverride from 'method-override';
import * as path from 'path';

export default function(app) {

  let rootPath = path.normalize(`${__dirname}/../..`);
  let clientPath: string = path.join(rootPath, 'client');

  app.use(express.static(clientPath));
  app.set('clientPath', clientPath);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // let env = app.get('env');
  let env = process.env.NODE_ENV  || 'development';
  if (env === 'development') {
    app.use(errorHandler());
  }

}

