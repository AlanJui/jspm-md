///<reference path="../_client.d.ts"/>

import {Contact} from '../models/Contact';
import {IContactService} from '../common/services/contact.service';
import ContactPanelController from './contactPanel.controller';

class MainController {
  contacts = [];
  selectedContact: Contact = null;

  static $inject = [
    'ContactService',
    'getAllContacts',
    '$state',
    '$mdSidenav',
    '$mdToast',
    '$mdDialog',
    '$mdMedia',
    '$mdBottomSheet'
  ];
  
  constructor(
    public ContactService: IContactService,
    public getAllContacts,
    public $state,
    public $mdSidenav: angular.material.ISidenavService,
    public $mdToast: angular.material.IToastService,
    public $mdDialog: angular.material.IDialogService,
    public $mdMedia: angular.material.IMedia,
    public $mdBottomSheet: angular.material.IBottomSheetService
  ) {
    let self = this;
    
    self.contacts = getAllContacts;
    self.selectedContact = self.contacts[0];
    self.ContactService.selectedContact = self.selectedContact;

    $state.transitionTo('main.content');
  }

  toggleSideNav(): void {
    this.$mdSidenav('sideNav').toggle();
  }

  selectContact(contact: Contact) {
    console.log(`Click on ${JSON.stringify(contact)}`);
    this.selectedContact = contact;
    this.ContactService.selectedContact = contact;

    this.toggleSideNav();
  }

  getFullName(contact: Contact): string {
    return `${contact.firstName} ${contact.lastName}`;
  }
  
  makeContact($event): void {

    this.$mdBottomSheet.show({
      // parent: angular.element(document.getElementById('content')),
      templateUrl: 'scripts/main/contactPanel.tpl.html',
      controller: ContactPanelController,
      controllerAs: 'vm',
      bindToController: true,
      targetEvent: $event
    })
      .then((clickedItem) => {
        if (clickedItem) {
          console.log(`${clickedItem.name} is clicked!`);
        }
      });
  }
  
}

export default MainController;
