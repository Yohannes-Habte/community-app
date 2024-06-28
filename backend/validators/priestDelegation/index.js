import { check } from "express-validator";
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]([0-9]{3})[-. ]([0-9]{4})$/;
const registerValidator = () => {
  return [
    check("fullName")
      .trim()
      .notEmpty()
      .withMessage("Full name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Full name must be between 3 and 50 characters")
      .matches(/^[a-zA-Z]+ [a-zA-Z]+$/)
      .withMessage(
        "Full name must contain both first and last name, separated by a space"
      )
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage(
        "Full name can only contain alphabetic characters, spaces, hyphens, and apostrophes"
      )
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error("Full name must not contain numbers");
        }
        return true;
      }),

    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .withMessage("Email format is invalid")
      .normalizeEmail()
      .trim()
      .custom((value) => {
        const domain = value.split("@")[1];
        const blockedDomains = ["spam.com", "fake.com"]; // Add more blocked domains as needed
        if (blockedDomains.includes(domain)) {
          throw new Error("Email domain is not allowed");
        }
        return true;
      }),

    check("phoneNumber")
      .bail()
      .trim()
      .escape()
      .exists()
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(phoneRegex)
      .withMessage("Invalid phone number format"),

    check("serviceDate")
      .exists()
      .withMessage("Start date is required")
      .toDate()
      .matches(/^\d{2}\/\d{2}\/\d{4}$/)
      .withMessage("Date must be in DD/MM/YYYY format")
      .custom((value) => {
        const [day, month, year] = value.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          throw new Error("Invalid date");
        }
        return true;
      }),

    check("textMessage")
      .exists({ checkFalsy: true })
      .withMessage("Message is required")
      .trim()
      .isLength({ min: 50, max: 500 })
      .withMessage("Message must be between 50 and 500 characters")
      .escape()
      .matches(/^[a-zA-Z0-9\s\-.,?!]+$/)
      .withMessage(
        "Message can only contain letters, numbers, spaces, and basic punctuation"
      ),
  ];
};

export default registerValidator;
