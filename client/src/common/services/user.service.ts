///<reference path="../../_client.d.ts"/>

import './common.services';
import User from '../../domain/User';

module common {

  interface IUserService {
    loadAllUsers(): ng.IPromise<User[]>;
  }

  class UserService
    implements IUserService {

    selectedUser: User = null;

    static $inject = ['$q'];
    constructor(
      private $q: ng.IQService
    ) {
      console.log('UserService is ready!');
    }

    loadAllUsers(): ng.IPromise<User[]> {
      return this.$q.when(this.users);
    }

    private users: User[] = [
      {
        name: 'Lia Lugo',
        avatar: 'svg-1',
        bio: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.',
        notes: [
          {
            title: 'Pay back dinner',
            date: new Date('2016-01-12')
          },
          {
            title: 'Buy flowers for birthday',
            date: new Date('2016-01-19')
          }
        ]
      },
      {
        name: 'George Duke',
        avatar: 'svg-2',
        bio: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.',
        notes: [
          {
            title: 'Pay back dinner',
            date: new Date('2016-01-12')
          },
          {
            title: 'Buy flowers for birthday',
            date: new Date('2016-01-19')
          }
        ]
      },
      {
        name: 'Gener Delosreyes',
        avatar: 'svg-3',
        bio: 'Raw denim pour-over readymade Etsy Pitchfork.',
        notes: [
          {
            title: 'Pay back dinner',
            date: new Date('2016-01-12')
          },
          {
            title: 'Buy flowers for birthday',
            date: new Date('2016-01-19')
          }
        ]
      },
      {
        name: 'Lawrence Ray',
        avatar: 'svg-4',
        bio: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant',
        notes: [
          {
            title: 'Pay back dinner',
            date: new Date('2016-01-12')
          },
          {
            title: 'Buy flowers for birthday',
            date: new Date('2016-01-19')
          }
        ]
      },
      {
        name: 'Ernesto Urbina',
        avatar: 'svg-5',
        bio: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo.',
        notes: []
      },
      {
        name: 'Gani Ferrer',
        avatar: 'svg-6',
        bio: 'Lebowski ipsum yeah? What do you think happens when you get rad? ',
        notes: [
          {
            title: 'Pay back dinner',
            date: new Date('2016-01-12')
          },
          {
            title: 'Buy flowers for birthday',
            date: new Date('2016-01-19')
          }
        ]
      }
    ];
  }

  angular
    .module('common.services')
    .service('UserService', UserService);

}

export {UserService, IUserService};
