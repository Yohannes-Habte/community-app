import { body } from "express-validator";
const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,15}$/;

const validatePriest = () => {
  return [
    body("fullName")
      .notEmpty()
      .withMessage("Full name is required")
      .isString()
      .withMessage("Full name must be a string")
      .isLength({ min: 2, max: 60 })
      .withMessage("Full name must be between 2 and 60 characters")
      .matches(nameRegex)
      .withMessage(
        "Full name can only contain alphabetic characters and spaces"
      )
      .matches(fullNameRegex)
      .withMessage(
        "Full name must contain both first and last name, separated by a space"
      )
      .trim()
      .escape()
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error("Full name must not contain numbers");
        }
        return true;
      }),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long")
      .matches(emailRegex)
      .withMessage("Email format is invalid")
      .normalizeEmail()
      .custom((value) => {
        const domain = value.split("@")[1].toLowerCase();
        const blockedDomains = ["spam.com", "fake.com"];
        if (blockedDomains.some((blocked) => domain.endsWith(blocked))) {
          throw new Error("Email domain is not allowed");
        }
        return true;
      }),

    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required")
      .isString()
      .withMessage("Phone number must be a valid string")
      .matches(phoneRegex)
      .withMessage("Phone number must be between 10 and 15 digits")
      .trim()
      .escape(),

    body("serviceDate")
      .notEmpty()
      .withMessage("Date is required")
      .isISO8601()
      .withMessage("Valid date is required.")
      .custom((value) => {
        const currentDate = new Date();
        const selectedDate = new Date(value);

        if (selectedDate < currentDate) {
          throw new Error("Date must be a future date.");
        }

        return true;
      }),

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
