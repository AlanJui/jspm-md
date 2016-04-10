import {IContactService} from '../common/services/contact.service';
import {Contact} from '../domain/Contact';

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
    this.$mdSidenav('left').toggle();
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  getFullName(contact: Contact): string {
    return `${contact.firstName} ${contact.lastName}`;
  }
  
}

export default MainController;
