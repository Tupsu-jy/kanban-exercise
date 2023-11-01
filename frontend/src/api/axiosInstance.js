import axios from 'axios'

// Create an axios instance
const instance = axios.create({
  //This does not actually directly access env variable,
  //that is done in webpack config. Should be renamed.
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
    throw error
  }
)

export default instance
