///<reference path="../typings/mongodb.d.ts"/>

import * as mongodb from 'mongodb';
import IUser from './models/User';
import IImage from './models/Image';
import IBoard from './models/Board';

let server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
let db = new mongodb.Db('mydb', server, { w: 1 });
db.open(function() {});

export function getUser(id: string, callback: (user: IUser) => void) {
  db.collection('users', (error, users) => {
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
      .find({}, { '_id': 1 })
      .toArray((error, userobjs) => {
        if (error) { console.error(error); return; }

        callback(userobjs);
      });
  });
}

export function getImage(imageId: string, callback: (image: IImage) => void) {
  db.collection('images', (error, imagesCollection) => {
    if (error) { console.error(error); return; }

    imagesCollection
      .findOne({_id: new mongodb.ObjectID(imageId)}, (error, image) => {
        if (error) { console.error(error); return; }
        callback(image);
      });
  });
}

export function getImages(imageIds: mongodb.ObjectID[], callback: (images: IImage[]) => void) {
  db.collection('images', function(error, imagesCollection) {
    if (error) { console.error(error); return; }

    imagesCollection
      .findOne({_id: {$in: imageIds}})
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
  
  db.collection('images', (error, imagesCollection) => {
    if (error) { console.error(error); return; }

    imagesCollection.insert(
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
