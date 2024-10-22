import { body } from "express-validator";
import Subscriber from "../../models/subscriber/index.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Subscriber validation rules
const validateSubscriber = () => {
  return [
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
      .custom(async (value) => {
        const subscriber = await Subscriber.findOne({ email: value });
        if (subscriber) {
          throw new Error("You have already subscribed.");
        }
        return true;
      }),

    body("date")
      .optional()
      .isISO8601()
      .withMessage("Date must be a valid ISO 8601 date format.")
      .toDate(),
  ];
};

export default validateSubscriber;
