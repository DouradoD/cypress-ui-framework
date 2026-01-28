import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from "../../pages/HomePage";
import { ElementsPage } from '../../pages/ElementsPage';
import { Forms } from '../utils/elements/forms';

let homePage: HomePage;
let elementsPage: ElementsPage;
let forms: Forms;

Before(() => {
  homePage = new HomePage();
  elementsPage = new ElementsPage();
  forms = new Forms("Diogo", "diogo@gmail.com", "Test", "Test");
});

Given('he is on the Elements page', () => {
  cy.terminalInfo('Given he is on the Elements page');
  cy.visit('/');
  homePage.accessTheElementsFromMenu();
});

When('he navigates to the {string} subSection from Elements', (subSectionName: string) => {
  cy.terminalInfo(`When he navigates to the "${subSectionName}" subSection from Elements`);
  elementsPage.accessTheSubSectionByName(subSectionName);
});

When('he fills out the TextBox form with valid data', () => {
  cy.terminalInfo('When he fills out the TextBox form with valid data');
  elementsPage.fillTextBoxFormWithValidData(forms.fullName, forms.email,
    forms.currentAddress, forms.permanentAddress);
});

When('he submits the form', () => {
  cy.terminalInfo('When he submits the form');
  elementsPage.submitTextBoxForm();
});

Then('the submitted data should be displayed correctly', () => {
  cy.terminalInfo('Then the submitted data should be displayed correctly');
  elementsPage.verifySubmittedDataIsDisplayedCorrectly(forms.fullName, forms.email,
    forms.currentAddress, forms.permanentAddress);
});

When('he expands all checkbox options', () => {
  cy.terminalInfo('When he expands all checkbox options');
  elementsPage.expandAllCheckboxes();
});

When('he selects the {string} checkbox', (checkboxName: string) => {
  cy.terminalInfo(`When he selects the ${checkboxName} checkbox`);
  elementsPage.selectCheckboxByName(checkboxName);
});

Then('the selected option {string} should be displayed correctly', (checkboxName: string) => {
  cy.terminalInfo(`Then the selected option ${checkboxName} should be displayed correctly`);
  elementsPage.verifySelectedCheckboxIsDisplayedCorrectly(checkboxName);
});

When('he selects the {string} radio button', (radioButtonName: string) => {
  cy.terminalInfo(`When he selects the ${radioButtonName} radio button`);
  elementsPage.selectRadioButtonByName(radioButtonName);
});

Then('the selected radio button {string} should be displayed correctly', (radioButtonName: string) => {
  cy.terminalInfo(`Then the selected radio button ${radioButtonName} should be displayed correctly`);
  elementsPage.verifySelectedRadioButtonIsDisplayedCorrectly(radioButtonName);
});


