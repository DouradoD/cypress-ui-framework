Cypress ui framework

```
cypress-cucumber-demo/
├── cypress/
│   ├── e2e/
│   │   └── features/
│   │       ├── authentication/
│   │       │   ├── login.feature
│   │       │   └── login.steps.ts
│   │       └── shopping/
│   │           ├── add-to-cart.feature
│   │           ├── checkout.feature
│   │           └── shopping.steps.ts
│   ├── support/
│   │   ├── commands.ts
│   │   ├── page-objects/
│   │   │   ├── LoginPage.ts
│   │   │   └── ProductsPage.ts
│   │   └── e2e.ts
│   └── fixtures/
│       └── users.json
├── package.json
├── cypress.config.ts
├── cucumber.json
└── README.md
```