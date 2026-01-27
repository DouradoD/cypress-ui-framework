// cypress.config.ts
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: '**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1920,
    viewportHeight: 1080,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config, {
        stepDefinitions: ['cypress/support/step_definitions/**/*.steps.ts'],
        filterSpecs: true,
        omitFiltered: true,
        messages: {
          enabled: true,
          output: 'cypress/cucumber-messages/',
        },
        pretty: true,
        verbose: true
      });

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Simple URL blocking - add endpoints you want to ignore
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          // Block specific domains (like the Criteo one you mentioned)
          launchOptions.args.push('--disable-background-networking');

          // Enable request blocking
          launchOptions.args.push('--disable-features=NetworkService');
        }
        return launchOptions;
      });

      // Add custom task for terminal logging
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        logInfo(message) {
          console.info(`ℹ️ - ${message}`);
          return null;
        },
        logError(message) {
          console.error(`❌ - ${message}`);
          return null;
        },
        logSuccess(message) {
          console.log(`✅ - ${message}`);
          return null;
        }
      });

      return config;
    },
  },
});