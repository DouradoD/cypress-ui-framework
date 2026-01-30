import { AlertFrameAndWindowsPageLocators } from '../locators/AlertFrameAndWindowsPageLocators';

export class AlertFrameAndWindowsPage {

    alertFrameAndWindowsPageLocators: AlertFrameAndWindowsPageLocators;

    constructor() {
        this.alertFrameAndWindowsPageLocators = new AlertFrameAndWindowsPageLocators();
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
        cy.get(this.alertFrameAndWindowsPageLocators.sectionListNames).each(($el) => {
            cy.log($el.text());
        });
        this.clickElementByText(this.alertFrameAndWindowsPageLocators.sectionListNames, sectionName, 'Section');
    }

    accessTheSubSectionByName(subSectionName: string) {
        cy.task('log', { level: 'info', message: `Looking for sub-section: ${subSectionName}` });
        let clicked = false;
        cy.get(this.alertFrameAndWindowsPageLocators.subSectionListNames).each(($el) => {
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

    clickButtonByName(buttonName: string) {
        const locatorMap: { [key: string]: string } = {
            'New Tab': this.alertFrameAndWindowsPageLocators.newTabButton,
            'New Window': this.alertFrameAndWindowsPageLocators.newWindowButton,
            'New Window Message': this.alertFrameAndWindowsPageLocators.newWindowMessageButton,
        };
        const locator = locatorMap[buttonName];
        if (!locator) throw new Error(`Button "${buttonName}" not found. Valid: ${Object.keys(locatorMap).join(', ')}`);
        cy.get(locator).click();
    }

    clickAlertButton() {
        cy.get(this.alertFrameAndWindowsPageLocators.alertButton).click();
    }

    verifyNewTabOpenedWithContent() {
        cy.url().should('include', '/sample');
        cy.get(this.alertFrameAndWindowsPageLocators.newTabBody).invoke('text').should('include', 'This is a sample page');
    }

    verifyNewWindowOpenedWithContent() {
        cy.url().should('include', '/sample');
        cy.get(this.alertFrameAndWindowsPageLocators.newWindowBody).invoke('text').should('include', 'This is a sample page');
    }

    /** Verifies the alert dialog was displayed (stub must be set before clicking the alert button). */
    verifyAlertDialogDisplayed() {
        cy.get('@alertStub').should('have.been.calledOnce');
    }

    /** Verifies the frame dialog (iframe) is displayed, not its body content. */
    verifyFrameDialogDisplayed() {
        cy.get(this.alertFrameAndWindowsPageLocators.frame1).should('be.visible');
    }

    /** Verifies the nested frame dialog (iframe) is displayed, not its body content. */
    verifyNestedFrameDialogDisplayed() {
        cy.get(this.alertFrameAndWindowsPageLocators.nestedFrameParent).should('be.visible');
    }

    openSmallModalDialog() {
        cy.get(this.alertFrameAndWindowsPageLocators.showSmallModalButton).click();
    }

    /** Verifies the small modal dialog is displayed. */
    verifySmallModalDialogDisplayed() {
        cy.get(this.alertFrameAndWindowsPageLocators.modalBody).should('be.visible');
    }
}
