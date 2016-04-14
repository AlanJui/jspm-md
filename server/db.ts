///<reference path="../typings/main.d.ts"/>

import * as mongodb from 'mongodb';

class DbUtil {
  static client = mongodb.MongoClient;
  static _db: mongodb.Db;

  static connect(): void {
    this.client.connect('mongodb://localhost:27017/mydb', (err, db) => {
      if (err) {
        console.error("Error connecting to MongoDB server - check mongod has been started");
        process.exit(1);
      }

      this._db = db;
      console.log('MongoDB Server connected');
    });
  }

  static users(): mongodb.Collection {
    return this._db.collection('users');
  }

}

export default DbUtil;

