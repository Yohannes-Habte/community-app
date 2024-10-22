import { check } from "express-validator";

const mongoDBObjectIdRegex = /^[a-fA-F\d]{24}$/;

const validateContribution = () => {
  return [
    check("user")
      .notEmpty()
      .withMessage("User ID is required")
      .isString()
      .withMessage("User ID must be a string")
      .matches(mongoDBObjectIdRegex)
      .withMessage("User ID must be a valid 24-character MongoDB ObjectId"),

    check("amount")
      .notEmpty()
      .withMessage("Amount is required")
      .isNumeric({ no_symbols: true })
      .withMessage("Amount must be a valid number")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be a positive value greater than zero")
      .toFloat(),

    check("date")
      .notEmpty()
      .withMessage("Date is required")
      .isISO8601()
      .withMessage("Date must be in a valid ISO8601 format (YYYY-MM-DD)"),
  ];
};

export default validateContribution;
