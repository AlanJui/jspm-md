///<reference path="../../_server.d.ts"/>

'use strict';

import * as express from 'express';

import * as ctrl from './user.controller';

export default function() {

  let router = express.Router();

  router.get('/nameList', ctrl.getNameList);

  router.route('/')
    .get(ctrl.list)
    .post(ctrl.create);

  router.use('/:id', ctrl.getById);

  router.route('/:id')
    .get(ctrl.read)
    .put(ctrl.update)
    .delete(ctrl.del);

  return router;
}
