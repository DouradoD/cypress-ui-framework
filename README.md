# Cypress QA Framework

Cypress-based test automation framework using **TypeScript**, **Gherkin/Cucumber**, and **Page Object Model** for UI and API testing.

---

## Table of Contents

- [Architecture](#architecture)
- [Dependencies](#dependencies)
- [How to Run Tests](#how-to-run-tests)
- [How to Get Reports](#how-to-get-reports)
- [Assumptions & Design Decisions](#assumptions--design-decisions)
- [Future Improvements](#future-improvements)

---

## Architecture

```
cypress-ui-framework/
├── cypress/
│   ├── e2e/
│   │   ├── api/specs/          # API tests (TypeScript)
│   │   │   ├── get-objects.spec.ts
│   │   │   ├── post-object.spec.ts
│   │   │   ├── put-objects.spec.ts
│   │   │   ├── patch-objects.spec.ts
│   │   │   └── delete-objects.spec.ts
│   │   └── features/           # UI tests (Gherkin/Cucumber)
│   │       ├── elements.feature
│   │       ├── forms.feature
│   │       ├── alert_frame_and_windows.feature
│   │       └── widgets.feature
│   ├── locators/               # Abstracted selectors (Bonus)
│   │   ├── ElementsPageLocators.ts
│   │   ├── FormsPageLocators.ts
│   │   ├── AlertFrameAndWindowsPageLocators.ts
│   │   └── WidgetsPageLocators.ts
│   ├── pages/                  # Page Object Model
│   │   ├── ElementsPage.ts
│   │   ├── FormsPage.ts
│   │   ├── HomePage.ts
│   │   └── ...
│   └── support/
│       ├── step_definitions/   # Cucumber step definitions
│       ├── commands.ts
│       ├── e2e.ts
│       └── utils/
├── cypress.config.ts
├── .cypress-cucumber-preprocessorrc.json
└── package.json
```

**Design:**
- **Pages**: Encapsulate page interactions and use locators from the locators layer
- **Locators**: Centralized selectors for maintainability
- **Step Definitions**: Highly parameterized using Scenario Outline and Examples
- **Features**: BDD scenarios in Gherkin

---

## Dependencies

### Prerequisites

- **Node.js** >= 20.12.0 (or >= 22)
- **npm** >= 9

### Install

```bash
npm install
```

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `cypress` | Test runner |
| `@badeball/cypress-cucumber-preprocessor` | Gherkin/Cucumber support |
| `@bahmutov/cypress-esbuild-preprocessor` | TypeScript compilation |
| `cypress-mochawesome-reporter` | API test reports |
| `typescript` | Type safety |

---

## How to Run Tests

### Run All Tests

```bash
npm run cy:run
```

### Run UI Tests Only (Cucumber/Features)

```bash
npm run cy:run:ui
```

### Run API Tests Only

```bash
npm run cy:run:api
```

### Run All Tests in Chrome

```bash
npm run cy:run:all
```

### Open Cypress Interactive Mode

```bash
npm run cy:open
```

---

## How to Get Reports

### UI Report (Cucumber)

After running UI tests:

- **Path:** `cypress/reports/cucumber-html/cucumber-report.html`
- **Open:** Double-click the file or run:
  ```bash
  start cypress/reports/cucumber-html/cucumber-report.html
  ```

### API Report (Mochawesome)

After running API tests:

- **Path:** `cypress/reports/mochawesome/index.html`
- **Open:** Double-click the file or run:
  ```bash
  start cypress/reports/mochawesome/index.html
  ```

### Clean Reports Before Run

```bash
npm run cy:clean:reports
```

> **Tip:** Close any open report in the browser before running tests to avoid `EBUSY` errors on Windows.

---

## Future Improvements

1. **CI/CD Integration**
   - Add GitHub Actions workflow for automated test runs
   - Publish reports as artifacts
   - Run on PR and main branch

2. **Environment Configuration**
   - Use `.env` for base URLs and config
   - Support multiple environments (dev, staging, prod)

3. **API Layer Abstraction**
   - Introduce an API client/service layer
   - Centralize request helpers and assertions

4. **Parallel Execution**
   - Run UI and API specs in parallel
   - Use `cypress-split` or similar for faster feedback

5. **Test Data Management**
   - Externalize test data (e.g. JSON/CSV)
   - Use factories or fixtures for dynamic data

6. **Retry Logic**
   - Configure retries for flaky scenarios
   - Improve stability in CI