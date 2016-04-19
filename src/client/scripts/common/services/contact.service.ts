///<reference path="../../_client.d.ts"/>

import {IContact, Contact} from '../../models/Contact';

interface IContactService {
  selectedContact: Contact;
  getAll(): ng.IPromise<Contact[]>;
}

class ContactService implements IContactService {

  selectedContact:Contact = null;

  static $inject = ['$http'];

  constructor(
    public $http: ng.IHttpService
  ) { }

  getAll(): ng.IPromise<Contact[]> {

    let self = this;

    return self.$http({
      method: 'GET',
      url: '/api/users'
    })
      .then((res) => {
          // success callback -- it will be called asynchronously
          return res.data;
        },
        (res) => {
          // error callback
          console.log(`(${res.status}): ${res.statusText}`);
        }
      );
  }
}

export {ContactService, IContactService};

// import {IContact, Contact} from '../../domain/Contact';

// interface IContactService {
//   selectedContact: Contact;
//   getAll(): ng.IPromise<Contact[]>;
// }
//
// class ContactService
//   implements IContactService {
//
//   selectedContact: Contact = null;
//
//   static $inject = ['$q'];
//
//   constructor(
//     public $q: ng.IQService
//   ) {
//     console.log('ContactService is ready!');
//   }
//
//   getAll(): ng.IPromise<Contact[]> {
//     return this.$q.when(this.contacts);
//   }
//
//   // private contacts: Contact[] = [
//   private contacts: IContact[] = [
//     {
//       firstName: 'Lia',
//       lastName: 'Lugo',
//       avatar: 'svg-1',
//       bio: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.',
//       notes: [
//         {
//           title: 'Pay back dinner',
//           date: new Date('2016-01-12')
//         },
//         {
//           title: 'Buy flowers for birthday',
//           date: new Date('2016-01-19')
//         }
//       ]
//     },
//     {
//       firstName: 'George',
//       lastName: 'Duke',
//       avatar: 'svg-2',
//       bio: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.',
//       notes: [
//         {
//           title: 'Pay back dinner',
//           date: new Date('2016-01-12')
//         },
//         {
//           title: 'Buy flowers for birthday',
//           date: new Date('2016-01-19')
//         }
//       ]
//     },
//     {
//       firstName: 'Gener',
//       lastName: 'Delosreyes',
//       avatar: 'svg-3',
//       bio: 'Raw denim pour-over readymade Etsy Pitchfork.',
//       notes: [
//         {
//           title: 'Pay back dinner',
//           date: new Date('2016-01-12')
//         },
//         {
//           title: 'Buy flowers for birthday',
//           date: new Date('2016-01-19')
//         }
//       ]
//     },
//     {
//       firstName: 'Lawrence',
//       lastName: 'Ray',
//       avatar: 'svg-4',
//       bio: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant',
//       notes: [
//         {
//           title: 'Pay back dinner',
//           date: new Date('2016-01-12')
//         },
//         {
//           title: 'Buy flowers for birthday',
//           date: new Date('2016-01-19')
//         }
//       ]
//     },
//     {
//       firstName: 'Ernesto',
//       lastName: 'Urbina',
//       avatar: 'svg-5',
//       bio: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo.',
//       notes: []
//     },
//     {
//       firstName: 'Gani',
//       lastName: 'Ferrer',
//       avatar: 'svg-6',
//       bio: 'Lebowski ipsum yeah? What do you think happens when you get rad? ',
//       notes: [
//         {
//           title: 'Pay back dinner',
//           date: new Date('2016-01-12')
//         },
//         {
//           title: 'Buy flowers for birthday',
//           date: new Date('2016-01-19')
//         }
//       ]
//     }
//   ];
// }
//
// export {ContactService, IContactService};

