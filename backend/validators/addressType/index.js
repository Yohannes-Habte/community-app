import { check } from "express-validator";

const validateAddressType = () => {
  return [
    check("addressType")
      .isString()
      .withMessage("Address type must be a string")
      .isLength({ min: 3, max: 50 })
      .withMessage("Address type must be between 3 and 50 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage(
        "Address type can only contain alphabetic characters and spaces"
      )
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Address type is required"),
  ];
};

export default validateAddressType;
