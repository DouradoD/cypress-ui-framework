// cypress/support/e2e.ts
// Add this at the VERY TOP of the file

// Import commands
import './commands';

// Setup URL blocking before EACH test/scenario runs
// Using beforeEach ensures intercepts are re-established for every Cucumber scenario
beforeEach(() => {
  // Block Criteo requests - using explicit intercept patterns for better reliability
  // Pattern matches: https://mug.criteo.com/sid?cpp=...
  cy.intercept('GET', '**/mug.criteo.com/**', { statusCode: 200, body: '' }).as('blockCriteo');
  cy.intercept('GET', '**/criteo.com/**', { statusCode: 200, body: '' }).as('blockCriteoDomain');
  // Match the specific /sid endpoint with cpp parameter (using URL matching)
  cy.intercept('GET', '**/sid**', (req) => {
    if (req.url.includes('criteo.com') || req.url.includes('cpp=')) {
      console.log(`🚫 Blocking Criteo /sid request: ${req.url}`);
      req.reply({ statusCode: 200, body: '' });
    } else {
      req.continue();
    }
  }).as('blockCriteoSid');
  
  // Block OpenX ads
  cy.intercept('GET', '**/oajs.openx.net/**', { statusCode: 200, body: '' }).as('blockOpenX');
  
  // Block common analytics/tracking
  cy.intercept('GET', '**/google-analytics.com/**', { statusCode: 200, body: '' }).as('blockGA');
  cy.intercept('GET', '**/googletagmanager.com/**', { statusCode: 200, body: '' }).as('blockGTM');
  cy.intercept('GET', '**/collect**', { statusCode: 200, body: '' }).as('blockGACollect');
  
  // Additional middleware intercept as fallback for any other tracking requests
  cy.intercept({ middleware: true }, (req) => {
    const url = req.url.toLowerCase();
    
    // Block Criteo requests (catch-all pattern)
    if (url.includes('mug.criteo.com') || url.includes('criteo.com') || (url.includes('/sid') && url.includes('cpp='))) {
      console.log(`🚫 Blocking Criteo request: ${req.url}`);
      req.reply({
        statusCode: 200,
        body: '',
        headers: { 'Content-Type': 'text/plain' }
      });
      return;
    }
    
    // Block OpenX
    if (url.includes('openx') || url.includes('oajs.openx.net')) {
      console.log(`🚫 Blocking OpenX request: ${req.url}`);
      req.reply({
        statusCode: 200,
        body: '',
        headers: { 'Content-Type': 'text/plain' }
      });
      return;
    }
    
    // Let other requests continue
    req.continue();
  });
});

// Handle uncaught exceptions from cross-origin scripts
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing tests due to external script errors
  return false;
});