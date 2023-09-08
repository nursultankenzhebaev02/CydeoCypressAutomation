const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.cydeo.com/',
    video: false, 
    retries: 2, //If testing fails, it will try 2 more time
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
