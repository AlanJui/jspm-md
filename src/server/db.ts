///<reference path="./_server.d.ts"/>

import * as mongo from 'mongodb';

let url = null;
let MongoClient = mongo.MongoClient;
let ObjectID = mongo.ObjectID;

export function setURL(strURL: string) {
  url = strURL;
}

export function connect(callback) {

  MongoClient.connect(url, (err, db) => {
    if (err) {
      callback(err, null)
    }
    callback(null, db);
  });

}

export function getObjID(id: string) {

  let objID = new ObjectID(id);
  return objID;

}

export function list(name, callback) {

  connect( (err, db) => {
    if (err) {
      callback(err, null)
    }

    db.collection(name)
    .find({}).toArray((err, docs) => {
      if (err) {
        callback(err, null);
      }
      callback(null, docs);
    });
  });

}

export function insertOneDoc(name, doc, callback) {

  connect( (err, db) => {
    if (err) {
      callback(err, null)
    }

    db.collection(name)
      .insertOne(doc, (err, result) => {
        if (err) {
          callback(err, null);
        }
        callback(null, result.ops[0]);
      });
  });

}

export function findDocById(name, ID: string, callback) {

  connect((err, db) => {
    if (err) {
      callback(err, null)
    }

    let objectID = getObjID(ID);

    db.collection(name).findOne({'_id': objectID}, (err, doc) => {
      if (err) {
        callback(err, null);
      }
      callback(null, doc)
    });

  });

}

export function updateDocById(name, ID, updateDoc, callback) {

  connect( (err, db) => {
    if (err) {
      callback(err, null)
    }

    db.collection(name)
      .updateOne({'_id': ID}, {$set: updateDoc}, (err, result) => {
        if (err) {
          callback(err, null);
        }
        callback(null, 'OK');
      });
  });

}

export function removeDocById(name, ID, callback) {

  connect((err, db) => {
    if (err) {
      callback(err, null)
    }

    db.collection(name)
      .remove({'_id': ID}, (err, result) => {
        if (err) {
          callback(err, null);
        }
        callback(null, 'OK');
      });
  });

}

// ====================================================================

// 寫法二: 用 TypeScript ; 配合編譯成 CommonJS Module 的寫法
//
/////<reference path="../typings/main.d.ts"/>
//
// import * as mongodb from 'mongodb';
//
// class DbUtil {
//   functionclient = mongodb.MongoClient;
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

