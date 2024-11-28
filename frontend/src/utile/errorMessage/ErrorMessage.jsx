// Environment Configuration
const environment = import.meta.env.VITE_NODE_ENV || "development";
const isProduction = environment === "production";
const serverUrl = import.meta.env.VITE_REACT_APP_LIVE_URL;
const clientUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const baseUrl = serverUrl || clientUrl;

// Generic Helper Function for Error Handling
export const handleError = (error) => {
  let userMessage = "An unexpected error occurred. Please try again later.";
  let logMessage = null;
  let errorCategory = "unknown";

  if (error.response) {
    // Error response from the server
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      // Token expired or unauthorized access
      userMessage = "Session expired. Please log in again.";
      logMessage = `Unauthorized access at ${baseUrl}`;
      errorCategory = "auth";
    } else if (status === 403) {
      // Forbidden access
      userMessage = "You do not have permission to perform this action.";
      logMessage = `Forbidden at ${baseUrl}: ${message}`;
      errorCategory = "permission";
    } else if (status === 500) {
      // Server error
      userMessage = "Something went wrong. Please try again later.";
      logMessage = `Internal Server Error at ${baseUrl}: ${message}`;
      errorCategory = "server";
    } else {
      // Other HTTP errors
      userMessage = message || "An unexpected server error occurred.";
      logMessage = `HTTP ${status} Error at ${baseUrl}: ${message}`;
      errorCategory = "http";
    }
  } else if (error.request) {
    // No response from server
    userMessage = "Network error. Please check your internet connection.";
    logMessage = `Network Error at ${baseUrl}: ${error.message}`;
    errorCategory = "network";
  } else {
    // Something else went wrong
    userMessage = "An unexpected error occurred. Please try again.";
    logMessage = `Unexpected Error at ${baseUrl}: ${error.message}`;
    errorCategory = "unknown";
  }

  // Log error securely for debugging (e.g., to an external service)
  logError(logMessage, errorCategory);

  return { message: userMessage };
};

// Secure Logging Function
const logError = (logMessage, errorCategory) => {
  // Enrich the log message with additional context (e.g., the API base URL)
  // This makes it easier to debug issues by knowing the affected API endpoint.
  const enrichedLogMessage = `${logMessage} | API Base URL: ${baseUrl}`;

  // In non-production environments (e.g., development or testing),
  // output the log message to the console for immediate visibility.
  if (!isProduction) {
    console.error(`[${errorCategory.toUpperCase()}] ${enrichedLogMessage}`);
    // Example console output: [NETWORK] Network Error at http://localhost:8000/api/v1
  }

  // Send the error details to an external logging service for long-term storage
  // and centralized monitoring. This is useful for debugging issues in production.
  externalLogService({
    category: errorCategory, // The type of error (e.g., 'network', 'auth', etc.)
    message: enrichedLogMessage, // The detailed error message with context
    timestamp: new Date().toISOString(), // The current timestamp in ISO format
    environment, // The current environment (e.g., 'production', 'development')
  });
};

// Simulated External Logging Service
const externalLogService = (logDetails) => {
  // Retrieve the URL of the external logging service from environment variables.
  // If none is specified, fall back to a default placeholder URL.
  const loggingServiceUrl =
    import.meta.env.VITE_LOGGING_SERVICE_URL ||
    "https://fallback-log-service.com";

  // Log the error details to the console for debugging purposes.
  // This is helpful for development or in case the logging service is unavailable.
  console.log("Logging to external service:", logDetails);

  // Send a POST request to the external logging service to log the error details.
  // This ensures errors are tracked and can be analyzed later.
  fetch(loggingServiceUrl, {
    method: "POST", // Use the POST method to send the log details
    headers: {
      "Content-Type": "application/json", // Specify JSON content type for the request body
    },
    body: JSON.stringify(logDetails), // Serialize the log details into JSON
  }).catch((err) => {
    // If the logging service fails (e.g., network issues),
    // log the failure to the console in non-production environments.
    if (!isProduction) {
      console.error("Failed to log error to external service:", err.message);
    }
    // No further action is taken because this is a secondary feature;
    // the main application should continue to function normally.
  });
};

// Example usage of Localization
const localizedMessages = {
  default: "An unexpected error occurred. Please try again later.",
  401: "Session expired. Please log in again.",
  403: "You do not have permission to perform this action.",
  500: "Something went wrong on our end. Please try again later.",
  network: "Network error. Please check your internet connection.",
};

// Function to retrieve a user-friendly message for a given status code
export const getUserMessage = (statusCode) => {
  return localizedMessages[statusCode] || localizedMessages.default;
  // If the status code is not in the map, return the default message.
};
