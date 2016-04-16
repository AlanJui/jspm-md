///<reference path="../typings/main.d.ts"/>

import * as mongodb from 'mongodb';

interface IDbUtil {
  connectDbServer(): void;
  getCollection(name: string): mongodb.Collection;
}

class DbUtil implements IDbUtil {
  _db: mongodb.Db;
  client = mongodb.MongoClient;

  connectDbServer(): void {

    this.client.connect('mongodb://localhost:27017/mydb', (err, db) => {
      if (err) {
        console.error("Error connecting to MongoDB server - check mongod has been started");
        process.exit(1);
      }
      this._db = db;
      console.log('MongoDB Server connected');
    });

  }

  getCollection(name: string): mongodb.Collection {
    return this._db.collection(name);
  }

}

export default DbUtil;

// ====================================================================

// 寫法二: 用 TypeScript ; 配合編譯成 CommonJS Module 的寫法
//
/////<reference path="../typings/main.d.ts"/>
//
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

// ====================================================================

// 寫法一: 最符合 NodeJS 所採用的 CommonJS Module 架構，但以 ES2015 語法的寫法;
//
/////<reference path="../typings/main.d.ts"/>
// import * as mongodb from 'mongodb';
//
// 'use strict';
//
// let _db: mongodb.Db;
// let client = mongodb.MongoClient;
// module.exports = {
//
//   connect(): void {
//     client.connect('mongodb://localhost:27017/mydb', (err, db) => {
//       if (err) {
//         console.error("Error connecting to MongoDB server - check mongod has been started");
//         process.exit(1);
//       }
//       _db = db;
//       console.log('MongoDB Server connected');
//     })
//   },
//
//   getCollection(name): mongodb.Collection {
//     return _db.collection(name);
//   }
//
// }

