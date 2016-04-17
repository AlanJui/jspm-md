///<reference path="../_client.d.ts"/>

import MainController from './main.controller';

angular.module('main', ['ui.router'])
  .config(($stateProvider) => {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'scripts/main/main.tpl.html',
        resolve: {
          mainCtrlService: function ($http) {
            return $http.get(`/api/users`);
          }
        },
        controller: 'MainController',
        controllerAs: 'vm'
      })
  })
  .controller('MainController', MainController);
