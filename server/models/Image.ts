///<reference path="../../typings/main.d.ts"/>

import * as mongodb from 'mongodb';

interface IImage {
  _id: mongodb.ObjectID;
  user: string;
  caption: string;
  imageUri: string;
  link: string;
  board: string;
  comments: {
    text: string;
    user: string;
  }[];
}

export default IImage;
