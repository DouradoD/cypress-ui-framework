// cypress.config.ts
const { defineConfig } = require('cypress');
const path = require('path');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
  beforeRunHandler,
  afterRunHandler,
  beforeSpecHandler,
  afterSpecHandler,
  afterScreenshotHandler,
} = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: ['**/*.feature', 'cypress/e2e/api/**/*.spec.ts'],
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 15000,
    downloadsFolder: 'cypress/downloads',

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config, {
        stepDefinitions: ['cypress/support/step_definitions/**/*.steps.ts'],
        filterSpecs: true,
        omitFiltered: true,
        omitBeforeRunHandler: true,
        omitAfterRunHandler: true,
        omitBeforeSpecHandler: true,
        omitAfterSpecHandler: true,
        omitAfterScreenshotHandler: true,
        messages: {
          enabled: true,
          output: 'cypress/cucumber-messages/run.ndjson',
        },
        json: { enabled: false },
        html: {
          enabled: true,
          output: 'cypress/reports/cucumber-html/cucumber-report.html',
        },
        pretty: true,
        verbose: true
      });

      on('before:run', async (details) => {
        await beforeRunHandler(config);
        await beforeRunHook(details);
      });

      on('after:run', async (results) => {
        await afterRunHandler(config, results);
        await afterRunHook();
      });

      on('before:spec', async (spec) => {
        await beforeSpecHandler(config, spec);
      });

      on('after:spec', async (spec, results) => {
        await afterSpecHandler(config, spec, results);
      });

      on('after:screenshot', async (details) => {
        await afterScreenshotHandler(config, details);
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
          // Block ad/tracking domains (e.g. Criteo)
          launchOptions.args.push('--disable-background-networking');

          // Enable request blocking
          launchOptions.args.push('--disable-features=NetworkService');
        }
        return launchOptions;
      });

      // Add custom tasks for terminal logging and file operations
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
        },
        deleteFile(filePath) {
          const fs = require('fs');
          const fullPath = path.join(config.projectRoot || process.cwd(), filePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
          return null;
        }
      });

      return config;
    },
  },
});