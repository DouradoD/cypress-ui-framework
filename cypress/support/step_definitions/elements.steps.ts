import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from "../../pages/HomePage";

/*
    Given he is on the Elements page
    And he navigates to the "Text Box" section
    When he fills out the TextBox form with valid data
    And he submits the form
    Then the submitted data should be displayed correctly
*/
Given('he is on the Elements page', () => {
  cy.visit('');
  let homePage = new HomePage();
  homePage.accessTheElementsFromMenu();
});

When('he navigates to the {string} section', (sectionName: string) => {
  // Implement navigation to the specified section
  // Example: If sectionName is "Text Box", navigate to that section
  cy.log(`Navigating to the ${sectionName} section`);
});

When('he fills out the TextBox form with valid data', () => {
  // Implement form filling with valid data
  cy.log('Filling out the TextBox form with valid data');
});

When('he submits the form', () => {
  // Implement form submission
  cy.log('Submitting the form');
});

Then('the submitted data should be displayed correctly', () => {
  // Implement verification of the submitted data
  cy.log('Verifying that the submitted data is displayed correctly');
});
