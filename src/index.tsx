import React from 'react';
import ReactDOM from 'react-dom';
import newTable from './components/table';

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
  return <h1>Hello, {person.lastName} {person.firstName}</h1>;
}

let user = new Student("Jane", "M.", "User");
let table = newTable();

ReactDOM.render(table, document.getElementById("root"));