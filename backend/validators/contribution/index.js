import { check } from "express-validator";

const registerValidator = () => {
  return [
    check("userCode")
      .trim()
      .escape()
      .isLength({ min: 8, max: 32 })
      .matches(/^[a-zA-Z0-9]*$/)
      .withMessage("userCode must contain only alphanumeric characters")
      .custom((value) => {
        if (!/\d/.test(value)) {
          throw new Error("userCode must contain at least one digit");
        }
        if (!/[A-Z]/.test(value)) {
          throw new Error(
            "userCode must contain at least one uppercase letter"
          );
        }
        if (!/[a-z]/.test(value)) {
          throw new Error(
            "userCode must contain at least one lowercase letter"
          );
        }
        return true;
      }),

    check("donation")
      .exists()
      .withMessage("Donation amount is required")
      .isNumeric()
      .withMessage("Donation amount must be a number")
      .isDecimal()
      .withMessage("Donation amount must be positive")
      .custom((value) => value >= 0)
      .withMessage("Price cannot be negative")
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
