import IBoard from './Board';

interface IUser {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  fbId: number;
  boards: IBoard[];
}

export default IUser;
