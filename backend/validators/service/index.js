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

    // Conditional validation for `scriptureTopic`
    body("scriptureTopic")
      .optional({ nullable: true })
      .if((value, { req }) => req.body.serviceName === "scriptures")
      .notEmpty()
      .withMessage("Scripture topic is required for service 'scriptures'."),

    // Conditional validation for `catechismTopic`
    body("catechismTopic")
      .optional({ nullable: true })
      .if((value, { req }) => req.body.serviceName === "catechism")
      .notEmpty()
      .withMessage("Catechism topic is required for service 'catechism'."),

    body("serviceDate")
      .notEmpty()
      .withMessage("Service date is required.")
      .isISO8601()
      .withMessage("Service date must be a valid ISO 8601 date.")
      .toDate() // Converts the string to a Date object
      .custom((value, { req }) => {
        const serviceCategory = req.body.categoryName;
        const serviceName = req.body.serviceName;
        const today = new Date();
        const minimumDate = new Date(today); // Copy of today to calculate minimumDate

        // Calculate the minimum dates based on conditions
        if (serviceCategory === "Sacraments") {
          if (["marriage", "confirmation", "communion"].includes(serviceName)) {
            minimumDate.setMonth(today.getMonth() + 6);
          } else if (serviceName === "baptism") {
            minimumDate.setMonth(today.getMonth() + 1);
          } else {
            minimumDate.setDate(today.getDate() + 20);
          }
        } else if (serviceCategory === "Spiritual development") {
          minimumDate.setMonth(today.getMonth() + 2);
        } else if (serviceCategory === "Soul prayer") {
          minimumDate.setDate(today.getDate() + 14);
        }

        // Check if the provided serviceDate meets the minimum requirement
        if (value < minimumDate) {
          const daysRequired = Math.ceil(
            (minimumDate - today) / (1000 * 60 * 60 * 24)
          );

          throw new Error(
            `The selected service date for "${serviceName}" must be at least ${daysRequired} days from today. Please choose a later date.`
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
