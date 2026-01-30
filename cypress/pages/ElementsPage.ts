import { ElementsPageLocators } from '../locators/ElementsPageLocators';
import { UserInfo } from '../support/utils/elements/userInfo';
export class ElementsPage {

    elementPageLocators: ElementsPageLocators;

    constructor() {
        this.elementPageLocators = new ElementsPageLocators();
    }

    /**
     * Helper method to click an element by its text content
     * @param locator - CSS selector for the elements to search
     * @param textToFind - Text to match (case-insensitive, trimmed)
     * @param elementType - Type of element for error messages (e.g., "Section", "Checkbox")
     */
    private clickElementByText(locator: string, textToFind: string, elementType: string): void {
        let clicked = false;
        cy.get(locator).each(($el) => {
            if ($el.text().trim() === textToFind.trim()) {
                clicked = true;
                cy.wrap($el).click();
                return false; // Break the loop
            }
        }).then(() => {
            if (!clicked) {
                throw new Error(`${elementType} with name "${textToFind}" not found.`);
            }
        });
    }

    accessTheSectionByName(sectionName: string) {
        cy.get(this.elementPageLocators.sectionListNames).each(($el) => {
            cy.log($el.text());
        });
        this.clickElementByText(this.elementPageLocators.sectionListNames, sectionName, 'Section');
    }

    accessTheSubSectionByName(subSectionName: string) {
        cy.task('log', { level: 'info', message: `Looking for sub-section: ${subSectionName}` });
        let clicked = false;
        cy.get(this.elementPageLocators.subSectionListNames).each(($el) => {
            if ($el.text().trim() === subSectionName.trim()) {
                clicked = true;
                cy.wrap($el).click();
                cy.task('log', { level: 'success', message: `Clicked on: ${subSectionName}` });
                return false; // Break the loop
            }
        }).then(() => {
            if (!clicked) {
                cy.task('log', { level: 'error', message: `Sub-section with name "${subSectionName}" not found.` });
                throw new Error(`Sub-section with name "${subSectionName}" not found.`);
            }
        });
    }


    fillTextBoxFormWithValidData(fullname: string, email: string, currentAddress: string, permanentAddress: string) {
        cy.task('log', { level: 'info', message: `Filling form with: ${fullname}, ${email}, ${currentAddress}, ${permanentAddress}` });
        cy.get(this.elementPageLocators.fullNameInput).clear().type(fullname);
        cy.get(this.elementPageLocators.emailInput).clear().type(email);
        cy.get(this.elementPageLocators.currentAddressInput).clear().type(currentAddress);
        cy.get(this.elementPageLocators.permanentAddressInput).clear().type(permanentAddress);
        cy.task('log', { level: 'success', message: 'Form fields filled' });
    }

    submitTextBoxForm() {
        cy.get(this.elementPageLocators.submitButton).click();
    }

    verifySubmittedDataIsDisplayedCorrectly(fullname: string, email: string, currentAddress: string, permanentAddress: string) {
        cy.task('log', { level: 'info', message: 'Starting form verification...' });

        const fieldChecks = [
            { name: 'Full Name', locator: this.elementPageLocators.outputFormName, expected: fullname },
            { name: 'Email', locator: this.elementPageLocators.outputFormEmail, expected: email },
            { name: 'Current Address', locator: this.elementPageLocators.outputFormCurrentAddress, expected: currentAddress },
            { name: 'Permanent Address', locator: this.elementPageLocators.outputFormPermanentAddress, expected: permanentAddress }
        ];

        // Verify each field sequentially using Cypress assertions
        fieldChecks.forEach((field) => {
            cy.task('log', { level: 'info', message: `Checking ${field.name} field...` });
            cy.get(field.locator)
                .invoke('text')
                .then(text => {
                    cy.task('log', { level: 'log', message: `${field.name} field text: "${text}"` });
                    expect(text.trim(), `${field.name} should end with "${field.expected}"`).to.include(field.expected);
                });
        });

        // Summary log
        cy.then(() => {
            cy.task('log', { level: 'info', message: '=== Form Verification Results ===' });
            fieldChecks.forEach(field => {
                cy.task('log', { level: 'info', message: `${field.name}: ✅ PASS` });
            });
            cy.task('log', { level: 'success', message: 'All fields displayed the submitted data correctly.' });
        });
    }

    expandAllCheckboxes() {
        cy.get(this.elementPageLocators.expandAllButton).click();
    }

    selectCheckboxByName(option: string) {
        this.clickElementByText(this.elementPageLocators.checkboxNamesList, option, 'Checkbox');
    }

    verifySelectedCheckboxIsDisplayedCorrectly(option: string) {
        cy.task('log', { level: 'info', message: `Verifying selected checkbox option: ${option}` });
        cy.get(this.elementPageLocators.selectedCheckboxesOutput).invoke('text').then(text => {
            const checkboxOutput = text.trim();
            cy.task('log', { level: 'info', message: `Checkbox output: ${checkboxOutput} and option: ${option}` });
            expect(checkboxOutput.toLowerCase()).to.contain(option.toLowerCase());
        });
        cy.task('log', { level: 'success', message: `Checkbox option "${option}" is displayed correctly.` });
    }

    selectRadioButtonByName(option: string) {
        const radioButtonLocatorMap: { [key: string]: string } = {
            'Yes': this.elementPageLocators.yesRadioButton,
            'Impressive': this.elementPageLocators.impressiveRadioButton,
            'No': this.elementPageLocators.noRadioButton
        };

        const locator = radioButtonLocatorMap[option];
        if (!locator) {
            throw new Error(`Radio button with name "${option}" not found. Valid options: ${Object.keys(radioButtonLocatorMap).join(', ')}`);
        }
        cy.get(locator).click();
    }

    verifySelectedRadioButtonIsDisplayedCorrectly(option: string) {
        const expectedOption = option.toLowerCase();
        cy.get(this.elementPageLocators.selectedRadioButtonOutput)
            .invoke('text')
            .then(text => {
                const selectedOption = text.trim().toLowerCase();
                cy.task('log', { level: 'log', message: `Selected radio button displayed: ${selectedOption}` });
                expect(selectedOption).to.equal(expectedOption, `Radio button option "${option}" should be displayed correctly`);
                cy.task('log', { level: 'success', message: `Radio button option "${option}" is displayed correctly.` });
            });
    }

    selectLimitPageSize(limitPageSize: string) {
        cy.get(this.elementPageLocators.rowsPerPageSelect).select(limitPageSize);
    }

    addNewUsersWithValidData(userList: UserInfo[]) {
        userList.forEach(user => {
            cy.get(this.elementPageLocators.webTableAddNewUserButton).click();
            this.fillNewUserFormWithValidData(user);
            this.submitNewUserForm();
        });
    }

    fillNewUserFormWithValidData(user: UserInfo) {
        cy.get(this.elementPageLocators.webTableFormFirstNameInput).clear().type(user.firstName);
        cy.get(this.elementPageLocators.webTableFormLastNameInput).clear().type(user.lastName);
        cy.get(this.elementPageLocators.emailInput).clear().type(user.email);
        cy.get(this.elementPageLocators.webTableFormAgeInput).clear().type(user.age);
        cy.get(this.elementPageLocators.webTableFormSalaryInput).clear().type(user.salary);
        cy.get(this.elementPageLocators.webTableFormDepartmentInput).clear().type(user.department);
    }

    submitNewUserForm() {
        cy.get(this.elementPageLocators.submitButton).click();
    }


    removeNewUserFromTheTable(user: UserInfo) {
        cy.task('log', { level: 'info', message: `Removing user from table: ${user.firstName}, ${user.lastName}` });
        cy.contains(this.elementPageLocators.webTableRowList, user.firstName)
            .find(this.elementPageLocators.webTableRowDeleteIconButtonList)
            .click();
        cy.task('log', { level: 'success', message: `User "${user.firstName}" removed from table` });
    }

    searchForUser(user: UserInfo) {
        cy.get(this.elementPageLocators.webTableSearchInput).clear().type(user.firstName);
    }

    verifyNextButtonIsEnabled() {
        cy.get(this.elementPageLocators.webTableNextButton).should('be.enabled');
    }

    verifyTotalPageIsDisplayedCorrectly(totalPage: string) {
        cy.get(this.elementPageLocators.webTableTotalPage).should('have.text', totalPage);
    }

    /**
     * Verifies the user is displayed in the Web Table using Cypress command chain.
     * Cypress chain: commands queue and run in order; .should() retries until pass or timeout.
     */
    verifyTheFirstUserIsDiplayedCorrectlyInTheOutcomeTable(user: UserInfo) {
        cy.task('log', { level: 'info', message: `Verifying user in table: ${user.firstName}, ${user.lastName}, ${user.email}` });
        // Find the row group containing user's first name, then assert each cell
        cy.contains(this.elementPageLocators.webTableRowList, user.firstName)
            .within(() => {
                cy.get(this.elementPageLocators.webTableRowTextValues).eq(0).should('contain.text', user.firstName.trim());
                cy.get(this.elementPageLocators.webTableRowTextValues).eq(1).should('contain.text', user.lastName.trim());
                cy.get(this.elementPageLocators.webTableRowTextValues).eq(2).should('contain.text', user.age.trim());
                cy.get(this.elementPageLocators.webTableRowTextValues).eq(3).should('contain.text', user.email.trim());
                cy.get(this.elementPageLocators.webTableRowTextValues).eq(4).should('contain.text', user.salary.trim());
                cy.get(this.elementPageLocators.webTableRowTextValues).eq(5).should('contain.text', user.department.trim());
            });
        cy.task('log', { level: 'success', message: 'User is displayed correctly in the outcome table' });
    }

    /**
     * Verifies the user is NOT displayed in the Web Table using Cypress chain.
     */
    verifyUserIsNotDisplayedInTheTable(user: UserInfo) {
        cy.task('log', { level: 'info', message: `Verifying user is NOT in table: ${user.firstName}, ${user.lastName}` });
        cy.get(this.elementPageLocators.webTableRowList)
            .should('not.contain', user.firstName);
        cy.task('log', { level: 'success', message: 'User is not displayed in the table' });
    }

    verifyVisibleAfter5SecondsButtonIsDisplayed() {
        cy.get(this.elementPageLocators.visibleAfter5SecondsButton).should('be.visible');
    }

    verifyColorChangeButtonIsDisplayedInRedColor() {
        cy.get(this.elementPageLocators.colorChangeButton).should('have.css', 'color', 'rgb(220, 53, 69)');
    }

    verifyWillEnable5SecondsButtonIsEnabled() {
        cy.get(this.elementPageLocators.willEnable5SecondsButton).should('be.enabled');
    }

    downloadFile() {
        cy.get(this.elementPageLocators.downloadFileButton).click();
        // TODO: Check if the file is downloaded
        if(cy.readFile('cypress/downloads/sampleFile.jpeg').then(file => file.length > 0)) {
            cy.task('log', { level: 'success', message: 'File was downloaded' });
        } else {
            cy.task('log', { level: 'error', message: 'File was not downloaded' });
            throw new Error('File was not downloaded');
        }
    }

    uploadFileTheSameFileThatWasDownloaded() {
        let downloadFilePath = 'cypress/downloads/sampleFile.jpeg';
        cy.get(this.elementPageLocators.uploadFileButton).selectFile(downloadFilePath);
        cy.task('deleteFile', downloadFilePath);
        cy.task('log', { level: 'success', message: 'File was Uploaded and deleted from the downloads folder' });
    }

    verifyUploadedFileNameIsDisplayedBellowTheUploadButton() {
        cy.get(this.elementPageLocators.uploadedFileNameOutputText).should('contain.text', 'sampleFile.jpeg');
    }
}