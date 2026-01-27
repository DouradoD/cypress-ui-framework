import { ElementsPageLocators } from '../locators/ElementsPageLocators';

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
        cy.terminalInfo(`Looking for sub-section: ${subSectionName}`);
        let clicked = false;
        cy.get(this.elementPageLocators.subSectionListNames).each(($el) => {
            if ($el.text().trim() === subSectionName.trim()) {
                clicked = true;
                cy.wrap($el).click();
                cy.terminalSuccess(`Clicked on: ${subSectionName}`);
                return false; // Break the loop
            }
        }).then(() => {
            if (!clicked) {
                cy.terminalError(`Sub-section with name "${subSectionName}" not found.`);
                throw new Error(`Sub-section with name "${subSectionName}" not found.`);
            }
        });
    }


    fillTextBoxFormWithValidData(fullname: string, email: string, currentAddress: string, permanentAddress: string) {
        cy.terminalInfo(`Filling form with: ${fullname}, ${email}, ${currentAddress}, ${permanentAddress}`);
        cy.get(this.elementPageLocators.fullNameInput).clear().type(fullname);
        cy.get(this.elementPageLocators.emailInput).clear().type(email);
        cy.get(this.elementPageLocators.currentAddressInput).clear().type(currentAddress);
        cy.get(this.elementPageLocators.permanentAddressInput).clear().type(permanentAddress);
        cy.terminalSuccess('Form fields filled');
    }

    submitTextBoxForm() {
        cy.get(this.elementPageLocators.submitButton).click();
    }

    verifySubmittedDataIsDisplayedCorrectly(fullname: string, email: string, currentAddress: string, permanentAddress: string) {
        cy.terminalInfo('Starting form verification...');

        const fieldChecks = [
            { name: 'Full Name', locator: this.elementPageLocators.outputFormName, expected: fullname },
            { name: 'Email', locator: this.elementPageLocators.outputFormEmail, expected: email },
            { name: 'Current Address', locator: this.elementPageLocators.outputFormCurrentAddress, expected: currentAddress },
            { name: 'Permanent Address', locator: this.elementPageLocators.outputFormPermanentAddress, expected: permanentAddress }
        ];

        // Verify each field sequentially using Cypress assertions
        fieldChecks.forEach((field) => {
            cy.terminalInfo(`Checking ${field.name} field...`);
            cy.get(field.locator)
                .invoke('text')
                .then(text => {
                    cy.terminalLog(`${field.name} field text: "${text}"`);
                    expect(text.trim(), `${field.name} should end with "${field.expected}"`).to.include(field.expected);
                });
        });

        // Summary log
        cy.then(() => {
            cy.terminalInfo(`=== Form Verification Results ===`);
            fieldChecks.forEach(field => {
                cy.terminalInfo(`${field.name}: ✅ PASS`);
            });
            cy.terminalSuccess('All fields displayed the submitted data correctly.');
        });
    }

    expandAllCheckboxes() {
        cy.get(this.elementPageLocators.expandAllButton).click();
    }

    selectCheckboxByName(option: string) {
        this.clickElementByText(this.elementPageLocators.checkboxNamesList, option, 'Checkbox');
    }

    verifySelectedCheckboxIsDisplayedCorrectly(option: string) {
        cy.terminalInfo(`Verifying selected checkbox option: ${option}`);
        cy.get(this.elementPageLocators.selectedCheckboxesOutput).invoke('text').then(text => {
            const checkboxOutput = text.trim();
            cy.terminalInfo(`Checkbox output: ${checkboxOutput} and option: ${option}`);
            expect(checkboxOutput.toLowerCase()).to.contain(option.toLowerCase());
        });
        cy.terminalSuccess(`Checkbox option "${option}" is displayed correctly.`);
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
                cy.terminalLog(`Selected radio button displayed: ${selectedOption}`);
                expect(selectedOption).to.equal(expectedOption, `Radio button option "${option}" should be displayed correctly`);
                cy.terminalSuccess(`Radio button option "${option}" is displayed correctly.`);
            });
    }
}