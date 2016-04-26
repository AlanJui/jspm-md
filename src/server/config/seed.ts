///<reference path="../_server.d.ts"/>

'use strict';

import * as mongo from 'mongodb';

let MongoClient = mongo.MongoClient;

export default function Seed(url) {

  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.error(err);
    }

    insertDocuments(db, () => {
      db.close();
    });
  });

}

function insertDocuments(db, callback) {

  db.collection('users').insertMany(userData, (err, result) => {
    if (err) {
      return console.error(err);
    }

    console.log(`${result.ops.length} users for test has been created!`);

    callback();
  });

}

let userData = [
  {
    firstName: 'Lia',
    lastName: 'Lugo',
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
    firstName: 'George',
    lastName: 'Duke',
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
    firstName: 'Gener',
    lastName: 'Delosreyes',
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
    firstName: 'Lawrence',
    lastName: 'Ray',
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
    firstName: 'Ernesto',
    lastName: 'Urbina',
    avatar: 'svg-5',
    bio: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo.',
    notes: []
  },
  {
    firstName: 'Gani',
    lastName: 'Ferrer',
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

