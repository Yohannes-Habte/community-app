import { check } from "express-validator";

const validateAddressType = () => {
  return [
    check("addressType")
      .notEmpty()
      .withMessage("Address type is required")

      .isString()
      .withMessage("Address type must be a valid string")

      .isLength({ min: 3, max: 50 })
      .withMessage("Address type must be between 3 and 50 characters long")

      // Only alphabetic characters and spaces
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Address type can only contain letters and spaces")

      .trim()

      .escape(),
  ];
};

export default validateAddressType;
