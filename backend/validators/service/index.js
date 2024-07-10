import { body } from "express-validator";

// This "serviceValidation" will be applied for prayerRequest, sacrament and spiritual
const serviceValidation = () => {
  return [
    body("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ min: 1, max: 100 })
      .withMessage("Name must be between 1 and 100 characters."),

    body("date")
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

    body("phone")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Phone number is required.")
      .isMobilePhone()
      .withMessage("Phone number must be valid."),

    body("userStatus")
      .isString()
      .withMessage("Image URL must be a string")
      .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/)
      .withMessage("Image URL must be a valid URL")
      .notEmpty()
      .withMessage("Image URL is required"),

    body("serviceStatus")
      .optional()
      .isBoolean()
      .withMessage("Service status must be a boolean."),
  ];
};

export default serviceValidation;
