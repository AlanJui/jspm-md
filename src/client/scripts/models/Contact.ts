import Person from './Person';
import Note from './Note';

interface IContact {
  firstName: string;
  lastName: string;
  avatar: string;
  bio: string;
  notes: Note[];
}

class Contact extends Person implements IContact {
  firstName: string;
  lastName: string;
  avatar: string;
  bio: string;
  notes: Note[];

  constructor(
    firstName: string,
    lastName: string,
    avatar?: string,
    bio?: string,
    notes?: Note[]
  ) {
    super(firstName, lastName);

    if (!avatar) {
      this.avatar = null;
    } else {
      this.avatar = avatar;
    }

    if (!bio) {
      this.bio = null;
    } else {
      this.bio = bio;
    }

    if (!notes) {
      this.notes = [];
    } else {
      this.notes = notes;
    }
  }

}

export {IContact, Contact};
