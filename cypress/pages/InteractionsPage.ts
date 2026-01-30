import { InteractionsPageLocators } from '../locators/InteractionsPageLocators';

export class InteractionsPage {

    interactionsPageLocators: InteractionsPageLocators;

    constructor() {
        this.interactionsPageLocators = new InteractionsPageLocators();
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
        cy.get(this.interactionsPageLocators.sectionListNames).each(($el) => {
            cy.log($el.text());
        });
        this.clickElementByText(this.interactionsPageLocators.sectionListNames, sectionName, 'Section');
    }

    accessTheSubSectionByName(subSectionName: string) {
        cy.task('log', { level: 'info', message: `Looking for sub-section: ${subSectionName}` });
        let clicked = false;
        cy.get(this.interactionsPageLocators.subSectionListNames).each(($el) => {
            if ($el.text().trim() === subSectionName.trim()) {
                clicked = true;
                cy.wrap($el).click();
                cy.task('log', { level: 'success', message: `Clicked on: ${subSectionName}` });
                return false;
            }
        }).then(() => {
            if (!clicked) {
                cy.task('log', { level: 'error', message: `Sub-section with name "${subSectionName}" not found.` });
                throw new Error(`Sub-section with name "${subSectionName}" not found.`);
            }
        });
    }
}
