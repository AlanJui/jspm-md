///<reference path="../../typings/main.d.ts"/>

import * as mongodb from 'mongodb';

interface IBoard {
  title: string;
  description: string;
  images: mongodb.ObjectID[];
}

export default IBoard;
