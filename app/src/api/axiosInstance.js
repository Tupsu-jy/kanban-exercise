import axios from "axios";

// Create an axios instance
const instance = axios.create({
  //render cant find the environment variable so its hardcoded for now
  baseURL: "https://kanban-backend-j6tc.onrender.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Interceptors: handle global response behaviors.
instance.interceptors.response.use(
  (response) => response, // Directly return responses if successful

  (error) => {
    // Log any API call failures and propagate the error for further handling.
    console.error("API call failed:", error);
    throw error;
  }
);

export default instance;
