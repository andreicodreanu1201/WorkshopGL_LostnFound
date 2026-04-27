import axios from 'axios';
const baseurl = " "
const axiosInstance = axios.create({
  // Use the environment variable we set up earlier
  baseURL: baseurl, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    // Add any other custom headers your API requires globally here
  },
});

// 2. Request Interceptor
// This runs BEFORE every request is sent. It's the perfect place to attach Auth tokens.
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Grab a token from localStorage
    const token = localStorage.getItem('authToken'); 
    
    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle request errors (e.g., network issues before the request even leaves)
    return Promise.reject(error);
  }
);

// 3. Response Interceptor
// This runs AFTER your API responds, but BEFORE your component gets the data.
axiosInstance.interceptors.response.use(
  (response) => {
    // Axios wraps your data in a 'data' object. 
    // Returning response.data here means you don't have to type `.data` in your components.
    return response.data; 
  },
  (error) => {
    // Handle global errors based on HTTP status codes
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // 401 Unauthorized: The user's token expired or is invalid.
        console.error('Unauthorized! Token expired or invalid.');
        // You can clear storage and force a logout here:
        // localStorage.removeItem('authToken');
        // window.location.href = '/login'; 
      } else if (status === 403) {
        console.error('Forbidden! You lack permissions to access this.');
      } else if (status === 500) {
        console.error('Server error! Something went wrong on the backend.');
      }
    } else if (error.request) {
      // The request was made but no response was received (e.g., API is completely down)
      console.error('Network Error: No response received from the server.');
    }

    // Reject the promise so your component's catch block can still handle specific errors
    return Promise.reject(error);
  }
);

export default axiosInstance;