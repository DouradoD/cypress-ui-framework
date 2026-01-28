import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from '../../pages/HomePage';
import { FormsPage, PracticeFormUserInfo } from '../../pages/FormsPage';
import { UserInfo } from './user_info';

let homePage: HomePage;
let formsPage: FormsPage;
let practiceFormUser: UserInfo;

Before(() => {
  homePage = new HomePage();
  formsPage = new FormsPage();
  practiceFormUser = new UserInfo(
    'Diogo', 'Dourao', 'diogo.dourao@example.com', 'Male',
    '1234567890', '15 January 1990', 'Maths', 'Sports', '',
    '123 Main Street', 'NCR', 'Delhi'
  );
});

Given('he is on the Forms page', () => {
  cy.terminalInfo('Given he is on the Forms page');
  cy.visit('/');
  homePage.accessTheFormsFromMenu();
});

When('he navigates to the {string} subSection from Forms', (subSectionName: string) => {
  cy.terminalInfo(`When he navigates to the "${subSectionName}" subSection from Forms`);
  formsPage.accessTheSubSectionByName(subSectionName);
});

When('he fills out the Practice Form with valid data', () => {
  cy.terminalInfo('When he fills out the Practice Form with valid data');
  const data: PracticeFormUserInfo = {
    firstName: practiceFormUser.firstName,
    lastName: practiceFormUser.lastName,
    email: practiceFormUser.email,
    gender: practiceFormUser.gender,
    mobileNumber: practiceFormUser.mobileNumber,
    dateOfBirth: practiceFormUser.dateOfBirth,
    subjects: practiceFormUser.subjects,
    hobbies: practiceFormUser.hobbies,
    address: practiceFormUser.address,
    state: practiceFormUser.state,
    city: practiceFormUser.city,
  };
  formsPage.fillPracticeFormWithValidData(data);
});


Then('the submitted data from practice form should be displayed correctly', () => {
  cy.terminalInfo('Then the submitted data from practice form should be displayed correctly');
  const data: PracticeFormUserInfo = {
    firstName: practiceFormUser.firstName,
    lastName: practiceFormUser.lastName,
    email: practiceFormUser.email,
    gender: practiceFormUser.gender,
    mobileNumber: practiceFormUser.mobileNumber,
    dateOfBirth: practiceFormUser.dateOfBirth,
    address: practiceFormUser.address,
  };
  formsPage.verifySubmittedDataFromPracticeForm(data);
});
