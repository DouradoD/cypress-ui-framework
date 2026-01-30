// cypress.config.ts
const { defineConfig } = require('cypress');
const path = require('path');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
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
        messages: {
          enabled: true,
          output: 'cypress/cucumber-messages/run.ndjson',
        },
        json: {
          enabled: true,
          output: 'cypress/reports/cucumber-json',
        },
        pretty: true,
        verbose: true
      });

      // Clean report folders before each run
      on('before:run', () => {
        const fs = require('fs');
        const projectRoot = config.projectRoot || process.cwd();
        const jsonDir = path.join(projectRoot, 'cypress/reports/cucumber-json');
        const htmlDir = path.join(projectRoot, 'cypress/reports/cucumber-html');

        if (fs.existsSync(jsonDir)) {
          fs.readdirSync(jsonDir).forEach((file) => {
            const filePath = path.join(jsonDir, file);
            if (fs.statSync(filePath).isFile()) {
              fs.unlinkSync(filePath);
            }
          });
          console.log('🧹 Cleaned cucumber-json folder');
        }

        if (fs.existsSync(htmlDir)) {
          fs.rmSync(htmlDir, { recursive: true });
          console.log('🧹 Cleaned cucumber-html folder');
        }
      });

      // Generate JSON files from messages and create HTML report
      on('after:run', async (results) => {
        try {
          const fs = require('fs');
          const report = require('multiple-cucumber-html-reporter');
          const projectRoot = config.projectRoot || process.cwd();
          const jsonDir = path.join(projectRoot, 'cypress/reports/cucumber-json');
          const reportPath = path.join(projectRoot, 'cypress/reports/cucumber-html');
          const messagesPath = path.join(projectRoot, 'cypress/cucumber-messages/run.ndjson');

          // Ensure JSON directory exists
          if (!fs.existsSync(jsonDir)) {
            fs.mkdirSync(jsonDir, { recursive: true });
          }

          // Check if messages file exists and convert to JSON
          if (fs.existsSync(messagesPath)) {
            console.log('📝 Reading messages file and generating JSON files...');
            try {
              const messagesContent = fs.readFileSync(messagesPath, 'utf-8');
              const messages = messagesContent
                .split('\n')
                .filter(line => line.trim())
                .map(line => {
                  try {
                    return JSON.parse(line);
                  } catch (e) {
                    return null;
                  }
                })
                .filter(msg => msg !== null);

              // Group messages by feature URI
              const featuresMap = new Map();
              const testResultsMap = new Map();

              messages.forEach(msg => {
                // Collect gherkin documents
                if (msg.gherkinDocument && msg.gherkinDocument.uri) {
                  const uri = msg.gherkinDocument.uri;
                  if (!featuresMap.has(uri)) {
                    featuresMap.set(uri, msg.gherkinDocument);
                  }
                }
                // Collect test results
                if (msg.testRunStarted) {
                  // Test run started
                }
                if (msg.testCaseStarted) {
                  const testCaseId = msg.testCaseStarted.testCaseId;
                  if (!testResultsMap.has(testCaseId)) {
                    testResultsMap.set(testCaseId, { started: msg.testCaseStarted });
                  }
                }
                if (msg.testCaseFinished) {
                  const testCaseId = msg.testCaseFinished.testCaseId;
                  if (testResultsMap.has(testCaseId)) {
                    testResultsMap.get(testCaseId).finished = msg.testCaseFinished;
                  }
                }
                if (msg.testStepStarted) {
                  const testCaseId = msg.testStepStarted.testCaseId;
                  if (!testResultsMap.has(testCaseId)) {
                    testResultsMap.set(testCaseId, {});
                  }
                  if (!testResultsMap.get(testCaseId).steps) {
                    testResultsMap.get(testCaseId).steps = [];
                  }
                  testResultsMap.get(testCaseId).steps.push({ started: msg.testStepStarted });
                }
                if (msg.testStepFinished) {
                  const testCaseId = msg.testStepFinished.testCaseId;
                  if (testResultsMap.has(testCaseId) && testResultsMap.get(testCaseId).steps) {
                    const lastStep = testResultsMap.get(testCaseId).steps[testResultsMap.get(testCaseId).steps.length - 1];
                    if (lastStep && !lastStep.finished) {
                      lastStep.finished = msg.testStepFinished;
                    }
                  }
                }
              });

              // Convert each feature to Cucumber JSON format
              featuresMap.forEach((gherkinDoc, uri) => {
                const feature = gherkinDoc.feature;
                if (!feature) return;

                const featureName = path.basename(uri, '.feature');
                const timestamp = Date.now();
                const jsonFileName = `${featureName}.${timestamp}.json`;

                // Build Cucumber JSON structure
                const cucumberJson = [{
                  uri: uri,
                  id: feature.id || 'unknown',
                  keyword: feature.keyword || 'Feature',
                  name: feature.name || 'Unknown Feature',
                  line: feature.location?.line || 1,
                  description: feature.description || '',
                  elements: []
                }];

                // Add scenarios with test results
                if (feature.children) {
                  feature.children.forEach((child) => {
                    if (child.scenario) {
                      const scenario = child.scenario;
                      const scenarioId = scenario.id;
                      const testResult = testResultsMap.get(scenarioId);

                      const element = {
                        id: scenario.id || 'unknown',
                        keyword: scenario.keyword || 'Scenario',
                        name: scenario.name || 'Unknown Scenario',
                        description: scenario.description || '',
                        line: scenario.location?.line || 1,
                        type: 'scenario',
                        steps: []
                      };

                      // Add steps with results
                      if (scenario.steps) {
                        scenario.steps.forEach((step, stepIndex) => {
                          const stepResult = {
                            keyword: step.keyword || '',
                            name: step.text || '',
                            line: step.location?.line || 1,
                            match: { location: '' },
                            result: {
                              status: 'passed',
                              duration: 0
                            }
                          };

                          // Try to get actual test result if available
                          if (testResult && testResult.steps && testResult.steps[stepIndex]) {
                            const stepFinished = testResult.steps[stepIndex].finished;
                            if (stepFinished) {
                              stepResult.result.status = stepFinished.testStepResult.status || 'passed';
                              stepResult.result.duration = stepFinished.testStepResult.duration?.nanos || 0;
                            }
                          }

                          element.steps.push(stepResult);
                        });
                      }

                      cucumberJson[0].elements.push(element);
                    }
                  });
                }

                // Write JSON file
                const jsonFilePath = path.join(jsonDir, jsonFileName);
                fs.writeFileSync(jsonFilePath, JSON.stringify(cucumberJson, null, 2));
                console.log(`✅ Generated JSON: ${jsonFileName}`);
              });
            } catch (error) {
              console.error('❌ Error converting messages to JSON:', error.message);
              console.error(error.stack);
            }
          } else {
            console.warn('⚠️  Messages file not found at:', messagesPath);
          }

          // Check if JSON files exist
          const jsonFiles = fs.existsSync(jsonDir) 
            ? fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'))
            : [];

          if (jsonFiles.length === 0) {
            console.warn('⚠️  No JSON files found in cypress/reports/cucumber-json. Report generation skipped.');
            console.log('💡 Make sure your tests ran successfully and generated messages.');
            return;
          }

          console.log(`📊 Found ${jsonFiles.length} JSON file(s). Generating HTML report...`);

          report.generate({
            jsonDir: jsonDir,
            reportPath: reportPath,
            reportName: 'Cucumber Report',
            pageTitle: 'Cypress Cucumber Report',
            displayDuration: true,
            durationInMS: true,
            displayReportTime: true,
            openReportInBrowser: false,
          });
          console.log('✅ Cucumber HTML report generated in cypress/reports/cucumber-html/index.html');
        } catch (e) {
          console.error('❌ Cucumber HTML report generation failed:', e.message);
          console.error(e.stack);
        }
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