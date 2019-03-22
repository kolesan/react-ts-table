interface Person {
  firstName: string;
  lastName: string;
}

class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
  this.fullName = firstName + " " + middleInitial + " " + lastName;
}
}

function greeter(person: Person) {
  return `Hello, ${person.lastName} ${person.firstName}`;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);