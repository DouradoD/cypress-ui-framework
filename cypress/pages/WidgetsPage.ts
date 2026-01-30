import { WidgetsPageLocators } from '../locators/WidgetsPageLocators';

export class WidgetsPage {

    widgetsPageLocators: WidgetsPageLocators;

    constructor() {
        this.widgetsPageLocators = new WidgetsPageLocators();
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
        cy.get(this.widgetsPageLocators.sectionListNames).each(($el) => {
            cy.log($el.text());
        });
        this.clickElementByText(this.widgetsPageLocators.sectionListNames, sectionName, 'Section');
    }

    accessTheSubSectionByName(subSectionName: string) {
        cy.task('log', { level: 'info', message: `Looking for sub-section: ${subSectionName}` });
        const normalized = subSectionName.trim();
        const alias = normalized === 'Accordion' ? 'Accordian' : null;
        let clicked = false;
        cy.get(this.widgetsPageLocators.subSectionListNames).each(($el) => {
            const text = $el.text().trim();
            if (text === normalized || (alias && text === alias)) {
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

    /** Opens (expands) the accordion section whose heading matches the given message. */
    openAccordionMessage(message: string) {
        // TODO: Get the message visibility if not visible click on it, but first we need to get the list of heading and then check if the message is show if not click on it
        cy.get(this.widgetsPageLocators.messageHeading).each(($el) => {
            cy.log($el.text());
            if ($el.text().trim() === message.trim()) {
                if ($el.find(' + div[class="collapse show"]').length > 0) {
                    cy.log('Message is visible');
                } else {
                    cy.log('Message is not visible');
                    cy.wrap($el).click();
                }
            }
        });
    }

    /** Verifies the expanded accordion content includes the expected text. */
    verifyExpectedContentDisplayed(expectedContent: string) {
        cy.task('log', { level: 'info', message: `Verifying expected content: "${expectedContent.substring(0, 50)}..."` });
        cy.get(this.widgetsPageLocators.messageContent).invoke('text').then((actualText) => {
            cy.task('log', { level: 'info', message: `Actual content: "${actualText.substring(0, 50)}..."` });
            expect(actualText).to.include(expectedContent.trim());
        });
    }

    /** Types in the single-color Auto Complete input to interact with the widget. */
    interactWithAutoCompleteWidgetTypingTheSubstring(substring: string) {
        cy.get(this.widgetsPageLocators.autoCompleteMultipleContainerInput).type(substring);
    }

    /** Verifies the Auto Complete widget is displayed (input is visible and usable). */
    verifyAutoCompleteWidgetOptionsDisplayingTheSubstring(substring: string) {
        cy.get(this.widgetsPageLocators.autoCompleteMultipleOptions).should('be.visible').each(($el) => {
            cy.log($el.text());
            expect($el.text().toLowerCase()).to.include(substring.toLowerCase());
        });
    }
}
