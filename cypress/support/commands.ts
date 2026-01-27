// cypress/support/commands.ts
// This file is processed and loaded automatically before your test files.
//
// This is a great place to put global configuration and behavior
// that modifies Cypress.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Add custom commands here if needed
// For example:
// Cypress.Commands.add('login', (email: string, password: string) => { ... })

// Custom logging commands that output to terminal
Cypress.Commands.add('terminalLog', (message: string) => {
  cy.task('log', message);
});

Cypress.Commands.add('terminalInfo', (message: string) => {
  cy.task('logInfo', message);
});

Cypress.Commands.add('terminalError', (message: string) => {
  cy.task('logError', message);
});

Cypress.Commands.add('terminalSuccess', (message: string) => {
  cy.task('logSuccess', message);
});

// Import types for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      terminalLog(message: string): Chainable<void>
      terminalInfo(message: string): Chainable<void>
      terminalError(message: string): Chainable<void>
      terminalSuccess(message: string): Chainable<void>
    }
  }
}