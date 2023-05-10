const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
  excludeSpecPattern: [
      'cypress/e2e/1-getting-started/*',
      'cypress/e2e/1-advanced-examples/*',
  ]
    },
  },
});
