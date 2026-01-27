import { HomePageLocators } from '../locators/HomePageLocators';

export class HomePage {
    
    homePageLocators: HomePageLocators;
    
    constructor() {
        this.homePageLocators = new HomePageLocators();
    }

    /**
     * Selects a card from the home page menu by name (case-insensitive)
     * @param cardName - Name of the card to select
     */
    selectCardByName(cardName: string) {
        cy.get(this.homePageLocators.cardsNameList).each(($el, index) => {
            if ($el.text().toLowerCase().trim() === cardName.toLowerCase().trim()) {
                cy.get(this.homePageLocators.cardsNameList).eq(index).click();
                return false; // Break the loop once found
            }
        });
    }

    // Convenience methods for better readability in step definitions
    accessTheElementsFromMenu() {
        this.selectCardByName('Elements');
    }

    accessTheFormsFromMenu() {
        this.selectCardByName('Forms');
    }

    accessTheAlertsFrameWindowsFromMenu() {
        this.selectCardByName('Alerts, Frame & Windows');
    }

    accessTheWidgetsFromMenu() {
        this.selectCardByName('Widgets');
    }

    accessTheInteractionsFromMenu() {
        this.selectCardByName('Interactions');
    }

    accessTheBookStoreFromMenu() {
        this.selectCardByName('Book Store Application');
    }
}