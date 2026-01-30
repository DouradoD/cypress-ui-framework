export class UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;

    constructor(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.salary = salary;
        this.department = department;
    }
}