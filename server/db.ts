///<reference path="../typings/main.d.ts"/>

import * as mongodb from 'mongodb';
import IUser from './models/User';

let server = new mongodb
  .Server('localhost', 27017, {auto_reconnect: true});
let db = new mongodb.Db('mydb', server, { w: 1 });
db.open();

export function getUser(id: string, callback: (user: IUser) => void) {
  db.collection('users', function(error, users) {
    if (error) { console.error(error); return; }

    users.findOne({_id: id}, (error, user) => {
      if (error) { console.error(error); return; }

      callback(user);
    });
  });
}

export function getUsers(callback: (users: IUser[]) => void) {
  db.collection('users', (error, usersCollection) => {
    if (error) { console.error(error); return; }
    
    usersCollection
      // .find({}, { '_id': 1 })
      .find()
      .toArray((error, userobjs) => {
        if (error) { console.error(error); return; }

        callback(userobjs);
      });
  });
}

export function getImage(imageId: string, callback: (image: Image) => void) {
  db.collection('images', (error, images_collection) => {
    if (error) { console.error(error); return; }

    images_collection
      .findOne({_id: new mongodb.ObjectID(imageId)}, (error, image) => {
        if (error) { console.error(error); return; }
        callback(image);
      });
  });
}

export function getImages(imageIds: mongodb.ObjectID[], callback: (images: Image[]) => void) {
  db.collection('images', function(error, images_collection) {
    if (error) { console.error(error); return; }

    images_collection
      .find({_id: {$in: imageIds}})
      .toArray((error, images) => {
        callback(images);
      });
  });
}

export function addBoard(
  userid: any, 
  title: string, 
  description: string, 
  callback: (user: IUser) => void
) {
  
  db.collection('users', (error, users) => {
    if (error) { console.error(error); return; }

    users.update(
      {_id: userid},
      {
        '$push': {
          boards: {
            title: title,
            description: description,
            images: []
          }
        }
      },
      (error, user) => {
        if (error) { console.error(error); return; }
        callback(user);
      }
    );
  });
}

export function addPin(
  userid: string, 
  boardid: string, 
  imageUri: string, 
  link: string, 
  caption: string, 
  callback: (user: IUser) => void
) {
  
  db.collection('images', (error, images_collection) => {
    if (error) { console.error(error); return; }

    images_collection.insert(
      {
        user: userid,
        caption: caption,
        imageUri: imageUri,
        link: link,
        board: boardid,
        comments: []
      }, 
      (error, image) => {
        console.log(image);
        db.collection('users', (error, users) => {
          if (error) { console.error(error); return; }
          users.update(
            {
              _id: userid, 
              'boards.title': boardid
            },
            {
              '$push': {
                'boards.$.images': image[0]._id
              }
            },
            (error, user) => {
              callback(user);
            }
          );
        });
    });
  });
}
