import { check } from "express-validator";

const registerValidator = () => {
  return [
    check("contribution")
      .exists()
      .withMessage("Contribution is required")
      .isNumeric()
      .withMessage("Contribution must be a number")
      .isDecimal()
      .withMessage("Contribution must be positive")
      .custom((value) => value >= 0)
      .withMessage("Contribution cannot be negative")
      .toFloat(),

    check("offer")
      .exists()
      .withMessage("Offer is required")
      .isNumeric()
      .withMessage("Offer must be a number")
      .isDecimal()
      .withMessage("Offer must be positive")
      .custom((value) => value >= 0)
      .withMessage("Offer cannot be negative")
      .toFloat(),

    check("frekdasie")
      .exists()
      .withMessage("Frekdasie is required")
      .isNumeric()
      .withMessage("Frekdasie must be a number")
      .isDecimal()
      .withMessage("Frekdasie must be positive")
      .custom((value) => value >= 0)
      .withMessage("Frekdasie cannot be negative")
      .toFloat(),

    check("choirExpense")
      .exists()
      .withMessage("Choir expense is required")
      .isNumeric()
      .withMessage("Choir expense must be a number")
      .isDecimal()
      .withMessage("Choir expense must be positive")
      .custom((value) => value >= 0)
      .withMessage("Choir expense cannot be negative")
      .toFloat(),

    check("eventExpense")
      .exists()
      .withMessage("Event expense is required")
      .isNumeric()
      .withMessage("Event expense must be a number")
      .isDecimal()
      .withMessage("Event expense must be positive")
      .custom((value) => value >= 0)
      .withMessage("Offer cannot be negative")
      .toFloat(),

    check("priestExpense")
      .exists()
      .withMessage("Priest expense is required")
      .isNumeric()
      .withMessage("Priest expense must be a number")
      .isDecimal()
      .withMessage("Priest expense must be positive")
      .custom((value) => value >= 0)
      .withMessage("Priest expense cannot be negative")
      .toFloat(),

    check("guestExpense")
      .exists()
      .withMessage("Gest expense is required")
      .isNumeric()
      .withMessage("Gest expense must be a number")
      .isDecimal()
      .withMessage("Gest expense must be positive")
      .custom((value) => value >= 0)
      .withMessage("Gest expense cannot be negative")
      .toFloat(),

    check("presentExpense")
      .exists()
      .withMessage("Present expense is required")
      .isNumeric()
      .withMessage("Present expense must be a number")
      .isDecimal()
      .withMessage("Present expense must be positive")
      .custom((value) => value >= 0)
      .withMessage("Present expense cannot be negative")
      .toFloat(),

    check("tripExpense")
      .exists()
      .withMessage("Trip expense is required")
      .isNumeric()
      .withMessage("Trip expense must be a number")
      .isDecimal()
      .withMessage("Trip expense must be positive")
      .custom((value) => value >= 0)
      .withMessage("Trip expense cannot be negative")
      .toFloat(),

    check("otherExpense")
      .exists()
      .withMessage("Other expense is required")
      .isNumeric()
      .withMessage("Other expense must be a number")
      .isDecimal()
      .withMessage("Other expense must be positive")
      .custom((value) => value >= 0)
      .withMessage("Other expense cannot be negative")
      .toFloat(),

    check("date")
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
  ];
};

export default registerValidator;
