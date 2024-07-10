import { body } from "express-validator";
import Finance from "../../models/finance/index.js";

// Finance validation rules
const validateFinance = () => {
  return [
    body("contribution")
      .isNumeric()
      .withMessage("Contribution must be a number.")
      .notEmpty()
      .withMessage("Contribution is required."),

    body("offer")
      .isNumeric()
      .withMessage("Offer must be a number.")
      .notEmpty()
      .withMessage("Offer is required."),

    body("servicePayment")
      .isNumeric()
      .withMessage("Service payment must be a number.")
      .notEmpty()
      .withMessage("Service payment is required."),

    body("frekdasie")
      .isNumeric()
      .withMessage("Frekdasie must be a number.")
      .notEmpty()
      .withMessage("Frekdasie is required."),

    body("choirExpense")
      .isNumeric()
      .withMessage("Choir expense must be a number.")
      .notEmpty()
      .withMessage("Choir expense is required."),

    body("eventExpense")
      .isNumeric()
      .withMessage("Event expense must be a number.")
      .notEmpty()
      .withMessage("Event expense is required."),

    body("priestExpense")
      .isNumeric()
      .withMessage("Priest expense must be a number.")
      .notEmpty()
      .withMessage("Priest expense is required."),

    body("guestExpense")
      .isNumeric()
      .withMessage("Guest expense must be a number.")
      .notEmpty()
      .withMessage("Guest expense is required."),

    body("presentExpense")
      .isNumeric()
      .withMessage("Present expense must be a number.")
      .notEmpty()
      .withMessage("Present expense is required."),

    body("tripExpense")
      .isNumeric()
      .withMessage("Trip expense must be a number.")
      .notEmpty()
      .withMessage("Trip expense is required."),

    body("otherExpense")
      .isNumeric()
      .withMessage("Other expense must be a number.")
      .notEmpty()
      .withMessage("Other expense is required."),

    body("date")
      .isDate()
      .withMessage("Date must be a valid.")
      .notEmpty()
      .withMessage("Date is required.")
      .custom(async (value) => {
        const finance = await Finance.findOne({ date: value });
        if (finance) {
          throw new Error("Date already exists.");
        }
        return true;
      }),
  ];
};

export default validateFinance;
