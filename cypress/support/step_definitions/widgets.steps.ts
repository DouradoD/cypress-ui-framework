import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from '../../pages/HomePage';
import { WidgetsPage } from '../../pages/WidgetsPage';

let homePage: HomePage;
let widgetsPage: WidgetsPage;

Before(() => {
  homePage = new HomePage();
  widgetsPage = new WidgetsPage();
});

Given('he is on the Widgets page', () => {
  cy.terminalInfo('Given he is on the Widgets page');
  cy.visit('/');
  homePage.accessTheWidgetsFromMenu();
});

When('he navigates to the {string} subSection from Widgets', (subSectionName: string) => {
  cy.terminalInfo(`When he navigates to the "${subSectionName}" subSection from Widgets`);
  widgetsPage.accessTheSubSectionByName(subSectionName);
});

When('he open the message {string} in the Accordion widget', (message: string) => {
  cy.terminalInfo(`When he open the message "${message}" in the Accordion widget`);
  widgetsPage.openAccordionMessage(message);
});

Then('the message displayed should include {string}', (expectedContent: string) => {
  cy.terminalInfo(`Then the message displayed should include "${expectedContent.substring(0, 50)}..."`);
  widgetsPage.verifyExpectedContentDisplayed(expectedContent);
});

When('he interacts with the Auto Complete widget typing the substring {string}', (substring: string) => {
  cy.terminalInfo('When he interacts with the Auto Complete widget');
  widgetsPage.interactWithAutoCompleteWidgetTypingTheSubstring(substring);
});

Then('the Auto Complete widget should display the options containing the substring {string}', (substring: string) => {
  cy.terminalInfo(`Then the Auto Complete widget should display the options containing the substring "${substring}"`);
  widgetsPage.verifyAutoCompleteWidgetOptionsDisplayingTheSubstring(substring);
});
