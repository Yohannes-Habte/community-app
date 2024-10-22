import { body } from "express-validator";
import Finance from "../../models/finance/index.js";

// Finance validation rules
const validateFinance = () => {
  return [
    body("contribution")
      .notEmpty()
      .withMessage("Contribution is required.")
      .isFloat({ min: 0 })
      .withMessage("Contribution must be a positive number.")
      .toFloat(),

    body("offer")
      .notEmpty()
      .withMessage("Offer is required.")
      .isFloat({ min: 0 })
      .withMessage("Offer must be a positive number.")
      .toFloat(),

    body("servicePayment")
      .notEmpty()
      .withMessage("Service payment is required.")
      .isFloat({ min: 0 })
      .withMessage("Service payment must be a positive number.")
      .toFloat(),

    body("frekdasie")
      .notEmpty()
      .withMessage("Frekdasie is required.")
      .isFloat({ min: 0 })
      .withMessage("Frekdasie must be a positive number.")
      .toFloat(),

    body("choirExpense")
      .notEmpty()
      .withMessage("Choir expense is required.")
      .isFloat({ min: 0 })
      .withMessage("Choir expense must be a positive number.")
      .toFloat(),

    body("eventExpense")
      .notEmpty()
      .withMessage("Event expense is required.")
      .isFloat({ min: 0 })
      .withMessage("Event expense must be a positive number.")
      .toFloat(),

    body("priestExpense")
      .notEmpty()
      .withMessage("Priest expense is required.")
      .isFloat({ min: 0 })
      .withMessage("Priest expense must be a positive number.")
      .toFloat(),

    body("guestExpense")
      .notEmpty()
      .withMessage("Guest expense is required.")
      .isNumeric()
      .isFloat({ min: 0 })
      .withMessage("Guest expense must be a positive number.")
      .toFloat(),

    body("presentExpense")
      .notEmpty()
      .withMessage("Present expense is required.")
      .isFloat({ min: 0 })
      .withMessage("Present expense must be a positive number.")
      .toFloat(),

    body("tripExpense")
      .notEmpty()
      .withMessage("Trip expense is required.")
      .isFloat({ min: 0 })
      .withMessage("Trip expense must be a positive number.")
      .toFloat(),

    body("otherExpense")
      .notEmpty()
      .withMessage("Other expense is required.")
      .isFloat({ min: 0 })
      .withMessage("Other expense must be a positive number.")
      .toFloat(),

    body("date")
      .notEmpty()
      .withMessage("Date is required.")
      .isISO8601()
      .withMessage("Date must be a valid ISO 8601 date format (YYYY-MM-DD).")
      .custom(async (value) => {
        const inputDate = new Date(value);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth(); // getMonth() returns 0-11, so January is 0

        // Find if there's any existing record for the same month and year
        const existingFinance = await Finance.findOne({
          date: {
            $gte: new Date(year, month, 1), // First day of the month
            $lt: new Date(year, month + 1, 1), // First day of the next month
          },
        });

        if (existingFinance) {
          throw new Error(
            `A record for ${inputDate.toLocaleString("default", {
              month: "long",
            })} ${year} already exists.`
          );
        }
        return true;
      })
      .toDate(),
  ];
};

export default validateFinance;
