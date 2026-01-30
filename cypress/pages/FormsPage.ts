import { FormsPageLocators } from '../locators/FormsPageLocators';

export interface PracticeFormUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobileNumber: string;
    dateOfBirth: string;
    subjects?: string;
    hobbies?: string;
    address: string;
    state?: string;
    city?: string;
}

export class FormsPage {

    formsPageLocators: FormsPageLocators;

    constructor() {
        this.formsPageLocators = new FormsPageLocators();
    }

    /**
     * Helper method to click an element by its text content
     */
    private clickElementByText(locator: string, textToFind: string, elementType: string): void {
        let clicked = false;
        cy.get(locator).each(($el) => {
            if ($el.text().trim() === textToFind.trim()) {
                clicked = true;
                cy.wrap($el).click();
                return false;
            }
        }).then(() => {
            if (!clicked) {
                throw new Error(`${elementType} with name "${textToFind}" not found.`);
            }
        });
    }

    accessTheSectionByName(sectionName: string) {
        cy.get(this.formsPageLocators.sectionListNames).each(($el) => {
            cy.log($el.text());
        });
        this.clickElementByText(this.formsPageLocators.sectionListNames, sectionName, 'Section');
    }

    accessTheSubSectionByName(subSectionName: string) {
        cy.task('log', { level: 'info', message: `Looking for sub-section: ${subSectionName}` });
        this.clickElementByText(this.formsPageLocators.subSectionListNames, subSectionName, 'SubSection');
    }

    fillDateOfBirth(dateOfBirth: string) {
        cy.get(this.formsPageLocators.openCalendarButton).click();
        cy.get(this.formsPageLocators.selectYearDropdown).select(dateOfBirth.split(' ')[2]);
        cy.get(this.formsPageLocators.selectMonthDropdown).select(dateOfBirth.split(' ')[1]);
        cy.get(this.formsPageLocators.dayListItem).contains(dateOfBirth.split(' ')[0]).click();
    }

    fillPracticeFormWithValidData(userInfo: PracticeFormUserInfo) {
        cy.task('log', { level: 'info', message: 'Filling Practice Form with valid data' });
        cy.get(this.formsPageLocators.firstNameInput).clear().type(userInfo.firstName);
        cy.get(this.formsPageLocators.lastNameInput).clear().type(userInfo.lastName);
        cy.get(this.formsPageLocators.userEmailInput).clear().type(userInfo.email);
        cy.contains('label', userInfo.gender).click();
        cy.get(this.formsPageLocators.mobileNumberInput).clear().type(userInfo.mobileNumber);
        this.fillDateOfBirth(userInfo.dateOfBirth);
        cy.get(this.formsPageLocators.currentAddressInput).clear().type(userInfo.address);
        if (userInfo.subjects) {
            cy.get(this.formsPageLocators.subjectsInput).type(userInfo.subjects + '{enter}');
        }
        if (userInfo.hobbies) {
            cy.contains('label', userInfo.hobbies).click();
        }
        if (userInfo.state) {
            cy.get(this.formsPageLocators.stateDropdown).type(userInfo.state + '{enter}');
        }
        if (userInfo.city) {
            cy.get(this.formsPageLocators.cityDropdown).type(userInfo.city + '{enter}');
        }
        cy.task('log', { level: 'success', message: 'Practice Form fields filled' });
    }

    verifySubmittedDataFromPracticeForm(userInfo: PracticeFormUserInfo) {
        cy.task('log', { level: 'info', message: 'Verifying submitted data from Practice Form' });
        cy.get(this.formsPageLocators.outputTable).within(() => {
            cy.contains(userInfo.firstName).should('be.visible');
            cy.contains(userInfo.lastName).should('be.visible');
            cy.contains(userInfo.email).should('be.visible');
            cy.contains(userInfo.mobileNumber).should('be.visible');
            cy.contains(userInfo.address).should('be.visible');
        });
        cy.task('log', { level: 'success', message: 'Submitted data from Practice Form is displayed correctly' });
    }

    verifyAllRequiredFieldsAreDisplayedInRedColor() {
        // wait until the practiceFormAfterSubmit be visible
        cy.get(this.formsPageLocators.practiceFormAfterSubmit).should('be.visible');
        let color = 'rgb(220, 53, 69)';
        cy.task('log', { level: 'info', message: 'Verifying all required fields are displayed in red color' });
        cy.get(this.formsPageLocators.firstNameInput).should('have.css', 'border-color', color);
        cy.get(this.formsPageLocators.lastNameInput).should('have.css', 'border-color', color);
        cy.get(this.formsPageLocators.genderRadio).each(($el) => {
            expect($el).to.have.css('color', color);
        });
        cy.get(this.formsPageLocators.mobileNumberInput).should('have.css', 'border-color', color);
        cy.task('log', { level: 'success', message: `All required fields are displayed in ${color} color` });
    }

    verifyAllRequiredFieldsAreDisplayedWithAlertIcon() {
        // The SVG path data (without quotes) - CSS values are URL-encoded, so we search for the raw path
        let invalidIconCode = 'M5.8 3.6h.4L6 6.5z';
        cy.task('log', { level: 'info', message: 'Verifying all required fields are displayed with alert icon' });
        cy.get(this.formsPageLocators.firstNameInput).should('have.css', 'background-image').and('include', invalidIconCode);
        cy.get(this.formsPageLocators.lastNameInput).should('have.css', 'background-image').and('include', invalidIconCode);
        cy.get(this.formsPageLocators.mobileNumberInput).should('have.css', 'background-image').and('include', invalidIconCode);
        cy.task('log', { level: 'success', message: 'All required fields are displayed with alert icon' });
    }

}
