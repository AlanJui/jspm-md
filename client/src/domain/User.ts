import Note from './Note';
import Contact from './Contact';

class User {

  constructor(
    public name: string,
    public avatar: string,
    public bio: string,
    public notes: Note[]
  ) {}

  static createContact(contact: Contact): User {
    return new User(
      `${contact.firstName} ${contact.lastName}`,
      contact.avatar,
      contact.bio,
      []
    );
  }
}

export default User;
