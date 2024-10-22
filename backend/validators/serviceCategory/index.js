import { body } from "express-validator";

const validateCategory = () => {
  return [
    body("category")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Category name is required.")
      .isString()
      .withMessage("Category name must be a valid string.")
      .isLength({ min: 2, max: 50 })
      .withMessage("Category name must be between 2 and 50 characters."),

    body("description")
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage("Description must be a valid string.")
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters."),
  ];
};

export default validateCategory;
