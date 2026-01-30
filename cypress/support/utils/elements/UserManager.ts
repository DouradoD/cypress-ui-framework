import { UserInfo } from "./userInfo";

export class UserManager {

    users: UserInfo[] = [];

    constructor() {
        this.users = [];
    }

    addUser(user: UserInfo) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }

    removeUser(user: UserInfo) {
        this.users = this.users.filter(u => u !== user);
    }

    generateRandomUser() {
        let randomCode = Math.random().toString(36).substring(2, 15);
        return new UserInfo(
            `User ${randomCode}`,
            `user${randomCode}`,
            `user${randomCode}@example.com`,
            Math.floor(18 + Math.random() * 60).toString(),
            Math.floor(Math.random() * 100000).toString(),
            `Department ${randomCode}`
        );
    }

    generateRandomUsers(numberOfUsers: number) {
        for (let i = 0; i < numberOfUsers; i++) {
            this.users.push(this.generateRandomUser());
        }
        return this.users;
    }
}