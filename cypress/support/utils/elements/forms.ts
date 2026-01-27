export class Forms {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;

    constructor(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
        this.fullName = fullName;
        this.email = email;
        this.currentAddress = currentAddress;
        this.permanentAddress = permanentAddress;
    }
}