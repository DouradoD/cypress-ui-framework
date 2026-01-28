export class UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobileNumber: string;
    dateOfBirth: string;
    subjects: string;
    hobbies: string;
    picture: string;
    address: string;
    state: string;
    city: string;

    constructor(firstName: string, lastName: string, email: string, gender: string, mobileNumber: string, dateOfBirth: string, subjects: string, hobbies: string, picture: string, address: string, state: string, city: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.dateOfBirth = dateOfBirth;
        this.subjects = subjects;
        this.hobbies = hobbies;
        this.picture = picture;
        this.address = address;
        this.state = state;
        this.city = city;
    }
}