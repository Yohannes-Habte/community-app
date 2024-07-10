import { check } from "express-validator";

const validateContribution = () => {
  return [
    check("user")
      .isString()
      .withMessage("User ID must be a string")
      .matches(/^[a-f\d]{24}$/i)
      .withMessage("User ID must be a valid MongoDB ObjectId")
      .notEmpty()
      .withMessage("User ID is required"),

    check("amount")
      .isNumeric()
      .withMessage("Amount amount must be a number")
      .isDecimal()
      .withMessage("Amount amount must be positive")
      .custom((value) => value >= 0)
      .withMessage("Price cannot be negative")
      .toFloat()
      .notEmpty()
      .withMessage("Amount is required"),

    check("date")
      .isDate()
      .withMessage("Date must be a valid date")
      .notEmpty()
      .withMessage("Date is required"),
  ];
};

export default validateContribution;
