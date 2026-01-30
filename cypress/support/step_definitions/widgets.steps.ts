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
  cy.visit('/');
  homePage.accessTheWidgetsFromMenu();
});

When('he navigates to the {string} subSection from Widgets', (subSectionName: string) => {
  widgetsPage.accessTheSubSectionByName(subSectionName);
});

When('he open the message {string} in the Accordion widget', (message: string) => {
  widgetsPage.openAccordionMessage(message);
});

Then('the message displayed should include {string}', (expectedContent: string) => {
  widgetsPage.verifyExpectedContentDisplayed(expectedContent);
});

When('he interacts with the Auto Complete widget typing the substring {string}', (substring: string) => {
  widgetsPage.interactWithAutoCompleteWidgetTypingTheSubstring(substring);
});

Then('the Auto Complete widget should display the options containing the substring {string}', (substring: string) => {
  widgetsPage.verifyAutoCompleteWidgetOptionsDisplayingTheSubstring(substring);
});
