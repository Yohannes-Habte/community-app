import { body } from "express-validator";
import mongoose from "mongoose";

// Helper function to check if a string is a valid ObjectId
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const serviceValidation = () => {
  return [
    body("userId")
      .notEmpty()
      .withMessage("User ID is required.")
      .custom((value) => isValidObjectId(value))
      .withMessage("Invalid User ID."),

    body("serviceCategory")
      .notEmpty()
      .withMessage("Service category is required.")
      .custom((value) => isValidObjectId(value))
      .withMessage("Invalid service category ID."),

    body("serviceName")
      .notEmpty()
      .withMessage("Service name is required.")
      .isString()
      .withMessage("Service name must be a string.")
      .isLength({ min: 2, max: 100 })
      .withMessage("Service name must be between 2 and 100 characters.")
      .trim()
      .escape(),

    body("serviceDate")
      .notEmpty()
      .withMessage("Service date is required.")
      .isISO8601()
      .withMessage("Service date must be a valid ISO 8601 date.")
      .toDate() // Converts the string to a Date object
      .custom((value) => {
        const currentDate = new Date();
        const serviceDate = new Date(value);

        // Calculate the date that is 60 days from the current date
        const minEventDate = new Date(currentDate);
        minEventDate.setDate(currentDate.getDate() + 90);

        if (serviceDate < minEventDate) {
          throw new Error(
            "Service date must be at least 90 days in the future"
          );
        }
        return true;
      }),

    body("identificationDocument")
      .isString()
      .withMessage("Image URL must be a string")
      .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/)
      .withMessage("Image URL must be a valid URL")
      .notEmpty()
      .withMessage("Image URL is required"),

    body("message")
      .notEmpty()
      .withMessage("Message is required.")
      .isString()
      .withMessage("Message must be a valid string.")
      .isLength({ min: 10, max: 1000 })
      .withMessage("Message must be between 10 and 1000 characters.")
      .matches(/^[a-zA-Z0-9\s\-.,?!]+$/)
      .withMessage(
        "Description can only contain letters, numbers, spaces, and basic punctuation"
      )
      .trim()
      .escape(),

    body("serviceStatus")
      .optional()
      .isString()
      .withMessage("Service status must be a valid string.")
      .isIn(["pending", "completed", "cancelled"])
      .withMessage(
        "Service status must be one of 'pending', 'completed', or 'cancelled'."
      ),
  ];
};

export default serviceValidation;
