import { body } from "express-validator";
import Subscriber from "../../models/subscriber/index.js";

// Subscriber validation rules
const validateSubscriber = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email must be a valid email address.")
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
      .isDate()
      .withMessage("Date must be a valid.")
      .toDate(),
  ];
};

export default validateSubscriber;
