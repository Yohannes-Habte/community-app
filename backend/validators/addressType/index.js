import { check } from "express-validator";

const addressTypeValidator = () => {
  return [
    check("addressType")
      .notEmpty()
      .withMessage("Description is required")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("comment must be between 3 and 100 characters")
      .escape(),
  ];
};

export default addressTypeValidator;
