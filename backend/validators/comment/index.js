import { check } from "express-validator";

const messageRegex = /^[a-zA-Z0-9\s\-.,?!()'"]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateComment = () => {
  return [
    check("email")
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

    check("message")
      .notEmpty()
      .withMessage("Message is required")
      .isString()
      .withMessage("Message must be a valid string")
      .isLength({ min: 50, max: 500 })
      .withMessage("Message must be between 10 and 500 characters long")
      .matches(messageRegex)
      .withMessage(
        "Message can only contain letters, numbers, spaces, and basic punctuation (.,?!'\"-)"
      )
      .trim()
      .escape(),
  ];
};

export default validateComment;
