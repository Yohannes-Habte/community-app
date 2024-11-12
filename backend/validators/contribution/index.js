import { check } from "express-validator";

const validateContribution = () => {
  return [
    check("user")
      .notEmpty()
      .withMessage("User ID is required")
      .isString()
      .withMessage("User ID must be a string")
      .isMongoId()
      .withMessage("User must be a valid MongoDB ObjectId"),

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
      .withMessage("Date must be a valid ISO 8601 date")
      .toDate(),
  ];
};

export default validateContribution;
