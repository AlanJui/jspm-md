///<reference path="./_client.d.ts"/>

import 'angular-material/angular-material.css!';
import 'angular-material-icons/angular-material-icons.css!';
// import 'app.css!';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-material-icons';

import './common/services/common.services';
import './main/main.module';

const URL_AVATAR_ICONS = './assets/svg/avatars.svg';
const URL_ICON_MENU = './assets/svg/menu.svg';
const URL_ICON_SHARE = './assets/svg/share.svg';

export function bootstrap() {

let app = angular
  .element(document)
  .ready(() => {
    let appName = 'app';
    let body = document.getElementsByTagName('body')[0];

    let app = angular
      .module(appName, [
        'common',
        'main',
        'ui.router',
        'ngMaterial',
        'ngMdIcons'
      ])
      .config(($urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');
      })
      .config(['$mdThemingProvider', ($mdThemingProvider: angular.material.IThemingProvider) => {
        $mdThemingProvider
          .theme('default')
          .primaryPalette('blue')
          .accentPalette('red');
      }])
      .config(['$mdIconProvider', ($mdIconProvider: angular.material.IIconProvider) => {
        $mdIconProvider
          .defaultIconSet(URL_AVATAR_ICONS, 128)

          .icon('menu', URL_ICON_MENU, 24)
          .icon('share', URL_ICON_SHARE, 24)

          .icon('phone', './assets/svg/phone.svg', 512)
          .icon('google_plus', './assets/svg/google_plus.svg', 512)
          .icon('hangouts', './assets/svg/hangouts.svg', 512)
          .icon('twitter', './assets/svg/twitter.svg', 512);
      }]);

    angular.bootstrap(body, [app.name], {strictDi: false});
  });

}

