import * as express from 'express';
import * as db from '../db';

export function index(
  req: express.Request, res: express.Response) {
  
  db.getUsers((users) => {
    console.dir(users);
    res.render('index', { 
      title: 'ImageBoard', 
      users: users 
    });
  });
}