import { check } from "express-validator";

const validateComment = () => {
  return [
    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required"),

    check("message")
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
  ];
};

export default validateComment;
