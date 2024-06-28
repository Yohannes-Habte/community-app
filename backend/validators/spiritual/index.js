import { check } from "express-validator";
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]([0-9]{3})[-. ]([0-9]{4})$/;
const registerValidator = () => {
  return [
    check("name")
      .exists({ checkNull: true })
      .notEmpty()
      .withMessage("Name is required")
      .trim()
      .isString()
      .withMessage("Name must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Name must contain only alphabetic characters")
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must be between 2 and 30 characters long"),

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

    check("phone")
      .bail()
      .trim()
      .escape()
      .exists()
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(phoneRegex)
      .withMessage("Invalid phone number format"),

    check("userStatus")
      .exists({ checkNull: true })
      .notEmpty()
      .withMessage("User status is required")
      .trim()
      .isString()
      .withMessage("User status must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("User status must contain only alphabetic characters")
      .isLength({ min: 2, max: 30 })
      .withMessage("User status must be between 2 and 30 characters long"),

    check("serviceStatus")
      .isBoolean()
      .withMessage("Service status must be a boolean value.")
      .custom((value) => value === true)
      .withMessage("You must agree to the terms and conditions."),
  ];
};

export default registerValidator;
