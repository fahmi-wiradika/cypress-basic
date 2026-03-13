const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        sendNotification: () => {
          console.log('Notification: API mocking test is running!')
          return 'Notification: API mocking test is running!'
        },
      })

      const version = config.env.version || 'development'
      const envConfig = require(`./cypress/environment/${version}.json`)

      // Apply Cypress config options directly to config object
      config.baseUrl = envConfig.baseUrl
      config.video = envConfig.video ?? config.video
      config.screenshotOnRunFailure = envConfig.screenshotOnRunFailure ?? config.screenshotOnRunFailure
      config.defaultCommandTimeout = envConfig.defaultCommandTimeout ?? config.defaultCommandTimeout

      // Preserve version in env for reference
      config.env = { version, ...envConfig }

      return config
    },
    viewportHeight: 945,
    viewportWidth: 1670, 
    experimentalStudio: true,
  },
});


require('@applitools/eyes-cypress')(module);
