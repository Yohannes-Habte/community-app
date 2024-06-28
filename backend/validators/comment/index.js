import { check } from "express-validator";

const commentValidator = () => {
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

    check("message")
      .exists({ checkFalsy: true })
      .withMessage("Description is required")
      .trim()
      .isLength({ min: 50, max: 500 })
      .withMessage("comment must be between 50 and 500 characters")
      .escape()
      .matches(/^[a-zA-Z0-9\s\-.,?!]+$/) 
      .withMessage(
        "Description can only contain letters, numbers, spaces, and basic punctuation"
      ),
  ];
};

export default commentValidator;
