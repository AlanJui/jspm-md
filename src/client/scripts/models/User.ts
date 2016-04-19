import {IPerson, Person} from './Person';

interface IUser extends IPerson {
  avatar: string;
  email: string;
}

class User {
  avatar: string;
  email: string;

  constructor(
    firstName: string,
    lastName: string,
    avatar?: string,
    email?: string
  ) {
    // super(firstName, lastName);

    if (!avatar) {
      this.avatar = null;
    } else {
      this.avatar = avatar;
    }

    if (!email) {
      this.email = null;
    } else {
      this.email = email;
    }
  }

}

export {IUser, User};
export default User;
