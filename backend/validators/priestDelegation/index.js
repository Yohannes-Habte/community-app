import { body } from "express-validator";

const validatePriest = () => {
  return [
    body("fullName")
      .notEmpty()
      .withMessage("Full name is required.")
      .isString()
      .withMessage("Full name must be a string.")
      .trim()
      .escape(),

    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email must be a valid email address.")
      .normalizeEmail(),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required.")
      .isMobilePhone()
      .withMessage("Phone number must be a valid mobile phone number.")
      .trim()
      .escape(),
    body("serviceDate")
      .isDate()
      .withMessage("Service date must be a valid.")
      .notEmpty()
      .withMessage("Service date is required.")
      .trim()
      .escape(),
    body("textMessage")
      .notEmpty()
      .withMessage("Text message is required.")
      .isString()
      .withMessage("Text message must be a string.")
      .trim()
      .escape(),
  ];
};

export default validatePriest;
