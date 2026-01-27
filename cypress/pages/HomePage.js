"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const HomePageLocators_1 = require("../locators/HomePageLocators");
class HomePage {
    constructor() {
        this.homePageLocators = new HomePageLocators_1.HomePageLocators();
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
    selectCardByName(cardName) {
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
exports.HomePage = HomePage;
