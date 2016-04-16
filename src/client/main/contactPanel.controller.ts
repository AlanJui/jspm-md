import {Contact} from '../domain/Contact';
import {IContactService} from '../common/services/contact.service';

class ContactPanelController {
  contact: Contact;
  fullName: string;
  
  actions = [
    {name: 'Phone', icon: 'phone'},
    {name: 'Twitter', icon: 'twitter'},
    {name: 'Google+', icon: 'google_plus'},
    {name: 'Hangouts', icon: 'hangouts'}
  ];

  static $inject = ['ContactService', '$mdBottomSheet'];

  constructor(
    private contactService: IContactService,
    private $mdBottomSheet: angular.material.IBottomSheetService
  ) {
    this.contact = contactService.selectedContact;
    this.fullName = `${this.contact.firstName} ${this.contact.lastName}`;
  }

  submitContact(action): void {
    this.$mdBottomSheet.hide(action);
  }
}

export default ContactPanelController;
