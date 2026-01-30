import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from '../../pages/HomePage';
import { AlertFrameAndWindowsPage } from '../../pages/AlertFrameAndWindowsPage';

let homePage: HomePage;
let alertFrameAndWindowsPage: AlertFrameAndWindowsPage;

Before(() => {
  homePage = new HomePage();
  alertFrameAndWindowsPage = new AlertFrameAndWindowsPage();
});

Given('he is on the Alerts Frame & Windows page', () => {
  cy.visit('/');
  homePage.accessTheAlertsFrameWindowsFromMenu();
});

When('he navigates to the {string} subSection from Alerts Frame & Windows', (subSectionName: string) => {
  alertFrameAndWindowsPage.accessTheSubSectionByName(subSectionName);
});

When('he clicks on the {string} button', (buttonName: string) => {
  if (buttonName === 'New Tab' || buttonName === 'New Window') {
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url: string) => {
        win.location.href = url;
      });
    });
  } else if (buttonName === 'New Window Message') {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpenStub');
    });
  }
  alertFrameAndWindowsPage.clickButtonByName(buttonName);
});

Then('a new tab should open with the correct content', () => {
  alertFrameAndWindowsPage.verifyNewTabOpenedWithContent();
});

Then('a new window should open with the correct content', () => {
  alertFrameAndWindowsPage.verifyNewWindowOpenedWithContent();
});

Then('a new window message should open with the correct content', () => {
  cy.get('@windowOpenStub').should('have.been.calledOnce');
});

When('he clicks on the Click button to see alert', () => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('alertStub');
  });
  alertFrameAndWindowsPage.clickAlertButton();
});

Then('the alert dialog should be displayed', () => {
  alertFrameAndWindowsPage.verifyAlertDialogDisplayed();
});

Then('the frame dialog should be displayed', () => {
  alertFrameAndWindowsPage.verifyFrameDialogDisplayed();
});

Then('the nested frame dialog should be displayed', () => {
  alertFrameAndWindowsPage.verifyNestedFrameDialogDisplayed();
});

When('he opens the small modal dialog', () => {
  alertFrameAndWindowsPage.openSmallModalDialog();
});

Then('the small modal dialog should be displayed', () => {
  alertFrameAndWindowsPage.verifySmallModalDialogDisplayed();
});
