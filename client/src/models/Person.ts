class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthday: Date,
    public age: number
  ) {}

  sayHi(): string {
    return `Hi! I am ${this.firstName}`;
  }
}

export default Person;
