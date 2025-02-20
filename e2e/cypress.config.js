const dotenv = require('dotenv')
const path = require('path')

// Load environment variables from .env file if not in Docker
if (!process.env.DOCKER_ENV) {
  dotenv.config({ path: path.resolve(__dirname, '../.env') })
}

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // If the DOCKER_ENV is set,then use the FRONTEND_SERVICE_NAME env variable as the baseUrl
    baseUrl: process.env.DOCKER_ENV
      ? process.env.FRONTEND_SERVICE_NAME
      : 'http://localhost:9000/demo',
    setupNodeEvents(on, config) {
      // You can access the environment variables here if needed
      console.log('Database Host:', process.env.DB_HOST)
      return config
    },
    // TODO: onko tää ihan ok?
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  env: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    DB_HOST: process.env.DOCKER_ENV ? process.env.DB_HOST : 'localhost',
  },
})
