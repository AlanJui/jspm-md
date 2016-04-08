import Note from './Note';

class Contact {
  constructor(
    public firstname: string,
    public lastName: string,
    public avatar: string,
    public bio: string,
    public notes: Note[]
  ) {}
}

export default Contact;
