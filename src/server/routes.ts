///<reference path="./_server.d.ts"/>

'use strict';

import * as path from 'path';

import users from './api/user';

export default function (app) {

  // Insert routes below
  app.use('/api/users', users());

  // app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('clientPath') + '/index.html'));
    });

}


