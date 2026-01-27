"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementsPage = void 0;
const ElementsPageLocators_1 = require("../locators/ElementsPageLocators");
class ElementsPage {
    constructor() {
        this.elementPageLocators = new ElementsPageLocators_1.ElementsPageLocators();
    }
    accessTheSectionByName(sectionName) {
        cy.get(this.elementPageLocators.sectionListNames).each(($el) => {
            if ($el.text().trim() === sectionName) {
                cy.wrap($el).click();
            }
        });
    }
    accessTheSubSectionByName(sectionName) {
        cy.get(this.elementPageLocators.sectionListNames).each(($el) => {
            if ($el.text().trim() === sectionName) {
                cy.wrap($el).click();
            }
        });
    }
    fillTextBoxFormWithValidData(fullname, email, currentAddress, permanentAddress) {
        cy.get(this.elementPageLocators.fullNameInput).type(fullname);
        cy.get(this.elementPageLocators.emailInput).type(email);
        cy.get(this.elementPageLocators.currentAddressInput).type(currentAddress);
        cy.get(this.elementPageLocators.permanentAddressInput).type(permanentAddress);
    }
    submitTextBoxForm() {
        cy.get(this.elementPageLocators.submitButton).click();
    }
    verifySubmittedDataIsDisplayedCorrectly(fullname, email, currentAddress, permanentAddress) {
        const results = {};
        // Check each field and collect results
        cy.get(this.elementPageLocators.outputFormName).invoke('text').then(text => {
            results['Full Name'] = text.includes(fullname);
        });
        cy.get(this.elementPageLocators.outputFormEmail).invoke('text').then(text => {
            results['Email'] = text.includes(email);
        });
        cy.get(this.elementPageLocators.outputFormCurrentAddress).invoke('text').then(text => {
            results['Current Address'] = text.includes(currentAddress);
        });
        cy.get(this.elementPageLocators.outputFormPermanentAddress).invoke('text').then(text => {
            results['Permanent Address'] = text.includes(permanentAddress);
        }).then(() => {
            // Log results as a table
            cy.log('=== Form Verification Results ===');
            Object.entries(results).forEach(([field, passed]) => {
                cy.log(`${field}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
            });
            // Create a simple table-like output
            const tableData = Object.entries(results).map(([field, passed]) => ({
                Field: field,
                Status: passed ? 'PASS' : 'FAIL',
                'Has Expected Value': passed ? 'Yes' : 'No'
            }));
            console.table(tableData);
            // Assert that all fields passed
            const allPassed = Object.values(results).every(result => result);
            expect(allPassed, 'All form fields should display the submitted data correctly').to.be.true;
        });
    }
    selectMultipleCheckboxes() {
        // Implement checkbox selection logic
        cy.log('Selecting multiple checkboxes');
        // Example: cy.get('.checkbox-selector').first().check();
    }
    verifySelectedCheckboxesAreDisplayed() {
        // Implement verification of selected checkboxes
        cy.log('Verifying selected checkboxes are displayed');
    }
    selectRadioButton(option) {
        // Implement radio button selection
        cy.log(`Selecting radio button: ${option}`);
        // Example: cy.get(`input[value="${option}"]`).check();
    }
}
exports.ElementsPage = ElementsPage;
