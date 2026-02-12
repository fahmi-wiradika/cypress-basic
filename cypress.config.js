const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://simple-crud-apps.vercel.app', 
    viewportHeight: 945,
    viewportWidth: 1670, 
    experimentalStudio: true,
  },
});
