export const handleAxiosError = (error) => {
  // Log error details
  console.error('Request Error:', error)

  // Customize error message for user display
  let errorMessage = 'An error occurred. Please try again.'
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error.response.data.message || 'Server error occurred.'
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response from server. Please check your network.'
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message
  }

  // Return or throw a new error with user-friendly message
  return Promise.reject(new Error(errorMessage))
}
