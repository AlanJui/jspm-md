///<reference path="../typings/main.d.ts"/>

'use strict';

import * as mongodb from 'mongodb';

let _db: mongodb.Db;
let client = mongodb.MongoClient;

module.exports = {

  connect(): void {
    client.connect('mongodb://localhost:27017/mydb', (err, db) => {
      if (err) {
        console.error("Error connecting to MongoDB server - check mongod has been started");
        process.exit(1);
      }
      _db = db;
      console.log('MongoDB Server connected');
    })
  },

  getCollection(name): mongodb.Collection {
    return _db.collection(name);
  }

}


// import * as mongodb from 'mongodb';
//
// class DbUtil {
//   static client = mongodb.MongoClient;
//   static _db: mongodb.Db;
//
//   static connect(): void {
//     this.client.connect('mongodb://localhost:27017/mydb', (err, db) => {
//       if (err) {
//         console.error("Error connecting to MongoDB server - check mongod has been started");
//         process.exit(1);
//       }
//
//       this._db = db;
//       console.log('MongoDB Server connected');
//     });
//   }
//
//   static users(): mongodb.Collection {
//     return this._db.collection('users');
//   }
//
// }
//
// export default DbUtil;

