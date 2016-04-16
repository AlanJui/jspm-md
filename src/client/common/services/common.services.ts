///<reference path="../../_client.d.ts"/>

import 'angular-resource';
import {ContactService} from './contact.service';

angular.module('common', ['ngResource'])
  .service('ContactService', ContactService);
