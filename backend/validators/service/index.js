import { body } from "express-validator";

// This "serviceValidation" will be applied for prayerRequest, sacrament and spiritual
const serviceValidation = () => {
  return [
    body("serviceName")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ min: 1, max: 100 })
      .withMessage("Name must be between 1 and 100 characters."),

    body("serviceDate")
      .isDate()
      .withMessage("Date must be a valid.")
      .notEmpty()
      .withMessage("Date is required.")
      .custom((value) => {
        if (new Date(value) <= new Date()) {
          throw new Error("Event date must be a future date");
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
      .isString()
      .withMessage("Message must be a string")
      .isLength({ min: 10, max: 500 })
      .withMessage("Message must be between 10 and 500 characters")
      .matches(/^[a-zA-Z0-9\s\-.,?!]+$/)
      .withMessage(
        "Description can only contain letters, numbers, spaces, and basic punctuation"
      )
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Message is required"),

    body("serviceStatus")
      .optional()
      .isBoolean()
      .withMessage("Service status must be a boolean."),
  ];
};

export default serviceValidation;
