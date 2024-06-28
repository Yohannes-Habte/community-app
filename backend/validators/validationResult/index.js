import createError from "http-errors";
import { validationResult } from "express-validator";

const checkValidation = (req, res, next) => {
  // This function checks the req object for any validation errors that were added by previous middleware (using express-validator)
  const errors = validationResult(req);

  // console.log("Validation error check=", errors);

  if (!errors.isEmpty()) {
    // The errors in line 6 are converted into an array of error objects (errors.array()).
    const foundErrors = errors.array();

    //Initializes an empty string called "errorMessage" to build the error message.
    let errorMessage = "";

    /*
    - error.msg: Contains the error message. error.msg is a property of the error object produced by the express-validator library. 
    - The forEach loop constructs a single error message string by concatenating each error message. It adds a newline character (\n) between messages, except for the last message.
    */

    foundErrors.forEach((error, index) => {
      index !== foundErrors.length - 1
        ? (errorMessage += error.msg + "\n ")
        : (errorMessage += error.msg);
    });

    // Creates a new error object with a 400 status code and the constructed error message.
    return next(createError(400, errorMessage));
  }

  // Passes the error object to the next middleware, typically an error-handling middleware.
  next();
};

export default checkValidation;
