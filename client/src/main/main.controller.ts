///<reference path="../_client.d.ts"/>

import '../common/services/user.service';

import User from '../domain/User';

class MainController {
  users = [];
  selectedUser: User = null;

  static $inject = [
    'UserService',
    '$mdSidenav',
    '$mdToast',
    '$mdDialog',
    '$mdMedia',
    '$mdBottomSheet'
  ];
  constructor(
    private UserService: common.IUserService,
    private $mdSidenav: angular.material.ISidenavService,
    private $mdToast: angular.material.IToastService,
    private $mdDialog: angular.material.IDialogService,
    private $mdMedia: angular.material.IMedia,
    private $mdBottomSheet: angular.material.IBottomSheetService
  ) {
    let self = this;

    this.UserService.loadAllUsers()
      .then((users: User[]) => {
        console.log(users);
        self.users = users;
        self.selectedUser = self.users[0];
        self.UserService.selectedUser = self.selectedUser;
      });
  }

  toggleSideNav(): void {
    this.$mdSidenav('left').toggle();
  }

}

export default MainController;
