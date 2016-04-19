interface IPerson {
  firstName: string;
  lastName: string;
}

class Person {

  constructor(
    public firstName: string,
    public lastName: string
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export {IPerson, Person};
export default Person;
