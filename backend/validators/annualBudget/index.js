import { check, body } from "express-validator";

const validateAnnualBudget = () => {
  return [
    // Validate and sanitize 'year'
    check("year")
      .notEmpty()
      .withMessage("The year field is required.")
      .bail()
      .isInt()
      .withMessage("The year must be a valid integer.")
      .trim()
      .escape(),

    // Validate and sanitize 'plannedBudget' as an array
    body("plannedBudget")
      .isArray({ min: 1 })
      .withMessage("Planned Budget must be an array with at least one item.")
      .bail(),

    // Validate each item in the 'plannedBudget' array
    body("plannedBudget.*.referenceNumber")
      .notEmpty()
      .withMessage("Reference number is required.")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Reference number must be a positive integer.")
      .trim()
      .escape(),

    body("plannedBudget.*.itemName")
      .notEmpty()
      .withMessage("Item name is required.")
      .bail()
      .isString()
      .withMessage("Item name must be a string.")
      .trim()
      .escape(),

    body("plannedBudget.*.unitCost")
      .notEmpty()
      .withMessage("Unit cost is required.")
      .bail()
      .isFloat({ min: 0.01 })
      .withMessage("Unit cost must be a positive number.")
      .toFloat(),

    body("plannedBudget.*.quantity")
      .notEmpty()
      .withMessage("Quantity is required.")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Quantity must be a positive integer.")
      .toInt()
      .trim()
      .escape(),

    body("plannedBudget.*.description")
      .notEmpty()
      .withMessage("Description is required.")
      .bail()
      .isString()
      .withMessage("Description must be a string.")
      .withMessage(
        "Description can only contain letters, numbers, spaces, and basic punctuation"
      )
      .trim()
      .escape(),

    // Validate and sanitize optional 'budgetStatus'
    check("budgetStatus")
      .optional({ checkFalsy: true })
      .isString()
      .withMessage("Budget status must be a string.")
      .isIn(["Pending", "Approved", "Rejected"])
      .withMessage(
        "Budget status must be one of: Pending, Approved, or Rejected."
      )
      .trim()
      .escape(),

    // Validate and sanitize optional 'remarks'
    check("remarks")
      .optional({ checkFalsy: true })
      .isString()
      .withMessage("Remarks must be a string.")
      .withMessage(
        "Remarks can only contain letters, numbers, spaces, and basic punctuation"
      )
      .trim()
      .escape(),
  ];
};

export default validateAnnualBudget;
