import axios from 'axios'
import { handleAxiosError } from './errorHandler'

// Create an axios instance
const instance = axios.create({
  //This does not actually directly access env variable,
  //that is done in webpack config. Should be renamed.
  //osoite on ilmeisesti määritelty window.BASE_URL:ssa. process.env.BASE_URL,ei toimi
  baseURL: window.BASE_URL || process.env.BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptors: handle global response behaviors.
instance.interceptors.response.use(
  (response) => response, // Directly return responses if successful

  (error) => {
    // Log any API call failures and propagate the error for further handling.
    console.error('API call failed:', error)
    handleAxiosError // Käytä keskitettyä virheenkäsittelyä virheille
  }
)

export default instance
