"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementsPageLocators = void 0;
class ElementsPageLocators {
    constructor() {
        this.sectionListNames = "#app div[class='element-group'] div[class='header-text']";
        this.subSectionListNames = "#app div[class='element-list collapse show'] span[class='text']";
        // Forms
        this.fullNameInput = '#userName';
        this.emailInput = '#userEmail';
        this.currentAddressInput = '#currentAddress';
        this.permanentAddressInput = '#permanentAddress';
        this.submitButton = '#submit';
        this.outputFormName = '#name';
        this.outputFormEmail = '#email';
        this.outputFormCurrentAddress = '#outpcurrentAddress';
        this.outputFormPermanentAddress = '#outputPermanentAddress';
    }
}
exports.ElementsPageLocators = ElementsPageLocators;
ElementsPageLocators.textBoxSection = 'div[id="item-0"]';
