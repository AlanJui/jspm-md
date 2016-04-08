///<reference path="_client.d.ts"/>

import 'angular-material/angular-material.css!';
import 'assets/app.css!';

import angular from 'angular';
import 'angular-material';

angular
  .element(document)
  .ready(() => {
    let appName = 'app';
    let body = document.getElementsByTagName('body')[0];

    // let app = angular
    //   .module(appName, []);
    let app = angular
      .module(appName, [
        'ngMaterial'
      ])
      .config(['$mdThemingProvider', ($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
          .primaryPalette('brown')
          .accentPalette('red');
      }]);
      
    angular.bootstrap(body, [app.name], {strictDi: false});
  });