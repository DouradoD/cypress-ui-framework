import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from "../../pages/HomePage";
import { ElementsPage } from '../../pages/ElementsPage';
import { Forms } from '../utils/elements/forms';
import { UserInfo } from '../utils/elements/userInfo';
import { UserManager } from '../utils/elements/UserManager';

let homePage: HomePage;
let elementsPage: ElementsPage;
let forms: Forms;
let userManager: UserManager;
let userList: UserInfo[] = [];
let userInfo: UserInfo;

Before(() => {
  homePage = new HomePage();
  elementsPage = new ElementsPage();
  forms = new Forms("Diogo", "diogo@gmail.com", "Test", "Test");
  userManager = new UserManager();
});

Given('he is on the Elements page', () => {
  cy.visit('/');
  homePage.accessTheElementsFromMenu();
});

When('he navigates to the {string} subSection from Elements', (subSectionName: string) => {
  elementsPage.accessTheSubSectionByName(subSectionName);
});

When('he fills out the TextBox form with valid data', () => {
  elementsPage.fillTextBoxFormWithValidData(forms.fullName, forms.email,
    forms.currentAddress, forms.permanentAddress);
});

When('he submits the form', () => {
  elementsPage.submitTextBoxForm();
});

Then('the submitted data should be displayed correctly', () => {
  elementsPage.verifySubmittedDataIsDisplayedCorrectly(forms.fullName, forms.email,
    forms.currentAddress, forms.permanentAddress);
});

When('he expands all checkbox options', () => {
  elementsPage.expandAllCheckboxes();
});

When('he selects the {string} checkbox', (checkboxName: string) => {
  elementsPage.selectCheckboxByName(checkboxName);
});

Then('the selected option {string} should be displayed correctly', (checkboxName: string) => {
  elementsPage.verifySelectedCheckboxIsDisplayedCorrectly(checkboxName);
});

When('he selects the {string} radio button', (radioButtonName: string) => {
  elementsPage.selectRadioButtonByName(radioButtonName);
});

Then('the selected radio button {string} should be displayed correctly', (radioButtonName: string) => {
  elementsPage.verifySelectedRadioButtonIsDisplayedCorrectly(radioButtonName);
});

When('he selects the limit page size as {string}', (limitPageSize: string) => {
  elementsPage.selectLimitPageSize(limitPageSize);
});

Then('the new user should be displayed correctly', () => {
  elementsPage.verifyTheFirstUserIsDiplayedCorrectlyInTheOutcomeTable(userList[0]);
});

Then('the user should not be displayed in the table', () => {
  cy.task('log', { level: 'info', message: `Then the user should not be displayed in the table: ${userList[0].firstName}` });
  elementsPage.verifyUserIsNotDisplayedInTheTable(userList[0]);
});

When("he adds {string} new user with valid data", function (numberOfUsers: string) {
  userList = userManager.generateRandomUsers(parseInt(numberOfUsers));
  elementsPage.addNewUsersWithValidData(userList);
});

When("he removes the new user from the table", () => {
  elementsPage.removeNewUserFromTheTable(userList[0]);
});

When("he searchs for the user deleted", () => {
  elementsPage.searchForUser(userList[0]);
});

Then('the next button should be enabled', () => {
  elementsPage.verifyNextButtonIsEnabled();
});

Then('the total page should be {string}', (totalPage: string) => {
  elementsPage.verifyTotalPageIsDisplayedCorrectly(totalPage);
});

Then('the Visible After 5 Seconds button should be displayed', () => {
  elementsPage.verifyVisibleAfter5SecondsButtonIsDisplayed();
});

Then('the Color change button should be displayed in red color', () => {
  elementsPage.verifyColorChangeButtonIsDisplayedInRedColor();
});

Then('the Will enable 5 Seconds button should be enabled', () => {
  elementsPage.verifyWillEnable5SecondsButtonIsEnabled();
});

When('he downloads the file', () => {
  elementsPage.downloadFile();
});

When('he uploads the file the same file that was downloaded', () => {
  elementsPage.uploadFileTheSameFileThatWasDownloaded();
});

Then('the uploaded file name should be displayed bellow the upload button', () => {
  elementsPage.verifyUploadedFileNameIsDisplayedBellowTheUploadButton();
});


