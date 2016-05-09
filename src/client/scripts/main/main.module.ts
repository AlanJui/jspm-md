///<reference path="../_client.d.ts"/>

import MainController from './main.controller';

angular.module('main', ['ui.router'])
  .config(($stateProvider) => {

    // $stateProvider
    //   .state('main', {
    //     url: '/',
    //     templateUrl: 'scripts/main/main.tpl.html',
    //     resolve: {
    //
    //       getAllContacts: function (ContactService) {
    //         return ContactService.getAll();
    //       }
    //
    //       // getAllContacts: function($http) {
    //       //   $http.get('/api/users')
    //       //     .then((response) => {
    //       //       return response.data;
    //       //     }, (response) => {
    //       //       throw new Error('can not get user\'s data');
    //       //     });
    //       // }
    //     },
    //     controller: 'MainController',
    //     controllerAs: 'vm'
    //   });
    
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          "": {
            templateUrl: 'scripts/main/main.tpl.html',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
              getAllContacts: function (ContactService) {
                return ContactService.getAll();
              }
            }
          },
          "detail": {
            templateUrl: 'scripts/main/detail.tpl.html'
          }
        }
      });

  })
  .controller('MainController', MainController);
