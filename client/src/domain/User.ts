import Person from './Person';

class User extends  Person {
  avatar: string;
  email: string;

  constructor(
    firstName: string,
    lastName: string,
    avatar?: string,
    email?: string
  ) {
    super(firstName, lastName);

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

export default User;
