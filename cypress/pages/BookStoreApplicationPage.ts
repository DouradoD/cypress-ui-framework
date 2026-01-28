import { BookStoreApplicationPageLocators } from '../locators/BookStoreApplicationPageLocators';

export class BookStoreApplicationPage {

    bookStoreApplicationPageLocators: BookStoreApplicationPageLocators;

    constructor() {
        this.bookStoreApplicationPageLocators = new BookStoreApplicationPageLocators();
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
        cy.get(this.bookStoreApplicationPageLocators.sectionListNames).each(($el) => {
            cy.log($el.text());
        });
        this.clickElementByText(this.bookStoreApplicationPageLocators.sectionListNames, sectionName, 'Section');
    }

    accessTheSubSectionByName(subSectionName: string) {
        cy.terminalInfo(`Looking for sub-section: ${subSectionName}`);
        let clicked = false;
        cy.get(this.bookStoreApplicationPageLocators.subSectionListNames).each(($el) => {
            if ($el.text().trim() === subSectionName.trim()) {
                clicked = true;
                cy.wrap($el).click();
                cy.terminalSuccess(`Clicked on: ${subSectionName}`);
                return false;
            }
        }).then(() => {
            if (!clicked) {
                cy.terminalError(`Sub-section with name "${subSectionName}" not found.`);
                throw new Error(`Sub-section with name "${subSectionName}" not found.`);
            }
        });
    }
}
