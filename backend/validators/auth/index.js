import { check } from "express-validator";

const validateRegister = () => {
  return [
    check("firstName")
      .isString()
      .withMessage("First name must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be between 2 and 50 characters")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("First name must contain only alphabetic characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First name is required"),

    check("lastName")
      .isString()
      .withMessage("Last name must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be between 2 and 50 characters")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Last name must contain only alphabetic characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last name is required"),

    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .withMessage("Email format is invalid")
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required")
      .custom((value) => {
        const domain = value.split("@")[1];
        const blockedDomains = ["spam.com", "fake.com"]; // Add more blocked domains as needed
        if (blockedDomains.includes(domain)) {
          throw new Error("Email domain is not allowed");
        }
        return true;
      }),

    check("password")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain a special character")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long and contain at least one number and one uppercase letter"
      ),

    check("phone")
      .isString()
      .withMessage("Phone number must be a string")
      .escape()
      .matches(/^[0-9]{10,15}$/)
      .withMessage("Phone number must be between 10 and 15 digits")
      .notEmpty()
      .withMessage("Phone number is required"),

    check("street")
      .isString()
      .withMessage("Street must be a string")
      .isLength({ min: 5, max: 100 })
      .withMessage("Street must be between 5 and 100 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Street is required"),

    check("zipCode")
      .isString()
      .withMessage("Zip code must be a string")
      .matches(/^\d{5}(-\d{4})?$/)
      .withMessage("Zip code must be a valid format")
      .escape()
      .notEmpty()
      .withMessage("Zip code is required"),

    check("city")
      .isString()
      .withMessage("City must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("City must be between 2 and 50 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("City is required"),

    check("state")
      .isString()
      .withMessage("State must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("State must be between 2 and 50 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("State is required"),

    check("country")
      .isString()
      .withMessage("Country must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Country must be between 2 and 50 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Country is required"),

    check("maritalStatus")
      .optional()
      .isString()
      .withMessage("Marital status must be a string")
      .isIn(["Single", "Married", "Divorced", "Widowed"])
      .withMessage("Invalid marital status"),

    check("addresses")
      .optional()
      .isArray()
      .withMessage("Addresses must be an array"),

    check("addresses.*.country")
      .isString()
      .withMessage("Address country must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Address country must be between 2 and 50 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Address country is required"),

    check("addresses.*.state")
      .isString()
      .withMessage("Address state must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Address state must be between 2 and 50 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Address state is required"),

    check("addresses.*.city")
      .isString()
      .withMessage("Address city must be a string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Address city must be between 2 and 50 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Address city is required"),

    check("addresses.*.address")
      .isString()
      .withMessage("Address must be a string")
      .isLength({ min: 5, max: 100 })
      .withMessage("Address must be between 5 and 100 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Address is required"),

    check("addresses.*.zipCode")
      .isString()
      .withMessage("Address zip code must be a string")
      .matches(/^\d{5}(-\d{4})?$/)
      .withMessage("Address zip code must be a valid format")
      .notEmpty()
      .withMessage("Address zip code is required"),

    check("addresses.*.addressType")
      .isString()
      .withMessage("Address type must be a string")
      .isIn(["Home", "Office", "Business"])
      .withMessage("Invalid address type")
      .notEmpty()
      .withMessage("Address type is required"),

    check("agree")
      .isBoolean()
      .withMessage("Agreement must be a boolean value")
      .notEmpty()
      .withMessage("Agreement is required"),
  ];
};

export default validateRegister;
