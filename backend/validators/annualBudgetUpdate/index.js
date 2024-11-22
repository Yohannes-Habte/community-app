import { check, body } from "express-validator";

const validateAnnualBudgetUpdate = () => {
  return [
    // Validate and sanitize optional 'budgetStatus'
    check("budgetStatus")
      .notEmpty()
      .withMessage("Budget status is required.")
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
      .notEmpty()
      .withMessage("Remarks is required.")
      .isString()
      .withMessage("Remarks must be a string.")
      .withMessage(
        "Remarks can only contain letters, numbers, spaces, and basic punctuation"
      )
      .trim()
      .escape(),
  ];
};

export default validateAnnualBudgetUpdate;
