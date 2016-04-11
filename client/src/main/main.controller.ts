import {IContactService} from '../common/services/contact.service';
import {Contact} from '../domain/Contact';
import ContactPanelController from './contactPanel.controller';

class MainController {
  contacts = [];
  selectedContact: Contact = null;

  static $inject = [
    'ContactService',
    '$mdSidenav',
    '$mdToast',
    '$mdDialog',
    '$mdMedia',
    '$mdBottomSheet'
  ];
  
  constructor(
    public contactService: IContactService,
    public $mdSidenav: angular.material.ISidenavService,
    public $mdToast: angular.material.IToastService,
    public $mdDialog: angular.material.IDialogService,
    public $mdMedia: angular.material.IMedia,
    public $mdBottomSheet: angular.material.IBottomSheetService
  ) {
    let self = this;
    
    this.contactService.getAll()
      .then((contacts: Contact[]) => {
        console.log(contacts);
        self.contacts = contacts;
        self.selectedContact = self.contacts[0];
        self.contactService.selectedContact = self.selectedContact;
      });
  }

  toggleSideNav(): void {
    this.$mdSidenav('sideNav').toggle();
  }

  selectContact(contact: Contact) {
    console.log(`Click on ${JSON.stringify(contact)}`);
    this.selectedContact = contact;
    this.contactService.selectedContact = contact;

    this.toggleSideNav();
  }

  getFullName(contact: Contact): string {
    return `${contact.firstName} ${contact.lastName}`;
  }
  
  makeContact($event): void {
    
    this.$mdBottomSheet.show({
      parent: angular.element(document.getElementById('content')),
      templateUrl: './views/contactPanel.tpl.html',
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
