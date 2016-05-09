///<reference path="../_client.d.ts"/>

import MainController from './main.controller';

angular.module('main', ['ui.router'])
  .config(($stateProvider) => {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'scripts/main/main.tpl.html',
        resolve: {
          getAllContacts: function (ContactService) {
            return ContactService.getAll();
          }

          // getAllContacts: function($http) {
          //   $http.get('/api/users')
          //     .then((response) => {
          //       return response.data;
          //     }, (response) => {
          //       throw new Error('can not get user\'s data');
          //     });
          // }
        },
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('main.content', {
        templateUrl: 'scripts/main/mainContent.tpl.html'
      })
      ;
  })
  .controller('MainController', MainController);
