import { HomePageLocators } from '../locators/HomePageLocators';

export class HomePage {
    homePageLocators: HomePageLocators;
    constructor() {
        this.homePageLocators = new HomePageLocators();
    }

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

    selectCardByName(cardName: string) {
        let acceptableCardNames = ['Elements', 'Forms', 'Alerts, Frame & Windows', 'Widgets', 'Interactions', 'Book Store Application'];
        if (!acceptableCardNames.includes(cardName)) {
            throw new Error(`Card name "${cardName}" is not acceptable. Please use one of the following: ${acceptableCardNames.join(', ')}`);
        }
        cy.get(this.homePageLocators.cardsNameList).each(($el, index, $list) => {
            if ($el.text().toLowerCase() === cardName.toLowerCase()) {
                cy.get(this.homePageLocators.cardsNameList).eq(index).click();
            }
        });
    }
}