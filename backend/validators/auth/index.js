import { check } from "express-validator";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const phoneRegex = /^\d{10,15}$/;

const zipCodeRegex = /^\d{5}(-\d{4})?$/;

const validateRegister = () => {
  return [
    check("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isString()
      .withMessage("First name must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be between 2 and 50 characters long")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("First name can only contain alphabetic characters")
      .trim()
      .escape(),

    check("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isString()
      .withMessage("Last name must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be between 2 and 50 characters long")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Last name can only contain alphabetic characters")
      .trim()
      .escape(),

    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long")
      .matches(emailRegex)
      .withMessage("Email format is invalid")
      .normalizeEmail()
      .custom((value) => {
        const domain = value.split("@")[1].toLowerCase();
        const blockedDomains = ["spam.com", "fake.com"];
        if (blockedDomains.some((blocked) => domain.endsWith(blocked))) {
          throw new Error("Email domain is not allowed");
        }
        return true;
      }),

    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be a valid string")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(passwordRegex)
      .withMessage(
        "Password must contain at least one number, one uppercase letter, and one special character"
      )
      .isStrongPassword()
      .withMessage(
        "Password must be at least 8 characters long with one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    check("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isString()
      .withMessage("Phone number must be a valid string")
      .matches(phoneRegex)
      .withMessage("Phone number must be between 10 and 15 digits")
      .trim()
      .escape(),

    check("street")
      .notEmpty()
      .withMessage("Street is required")
      .isString()
      .withMessage("Street must be a valid string")
      .isLength({ min: 5, max: 100 })
      .withMessage("Street must be between 5 and 100 characters long")
      .trim()
      .escape(),

    check("zipCode")
      .notEmpty()
      .withMessage("Zip code is required")
      .isString()
      .withMessage("Zip code must be a valid string")
      .matches(zipCodeRegex)
      .withMessage(
        "Zip code must be in a valid format (e.g., 12345 or 12345-6789)"
      )
      .trim()
      .escape(),

    check("city")
      .notEmpty()
      .withMessage("City is required")
      .isString()
      .withMessage("City must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("City must be between 2 and 50 characters long")
      .trim()
      .escape(),

    check("state")
      .notEmpty()
      .withMessage("State is required")
      .isString()
      .withMessage("State must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("State must be between 2 and 50 characters long")
      .trim()
      .escape(),

    check("country")
      .notEmpty()
      .withMessage("Country is required")
      .isString()
      .withMessage("Country must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Country must be between 2 and 50 characters long")
      .trim()
      .escape(),

    check("maritalStatus")
      .optional()
      .isString()
      .withMessage("Marital status must be a valid string")
      .isIn(["single", "married", "divorced", "widowed"])
      .withMessage("Invalid marital status"),

    check("addresses")
      .optional()
      .isArray()
      .withMessage("Addresses must be an array of objects"),

    check("addresses.*.country")
      .notEmpty()
      .withMessage("Address country is required")
      .isString()
      .withMessage("Address country must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Address country must be between 2 and 50 characters long")
      .trim()
      .escape(),

    check("addresses.*.state")
      .notEmpty()
      .withMessage("Address state is required")
      .isString()
      .withMessage("Address state must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Address state must be between 2 and 50 characters long")
      .trim()
      .escape(),

    check("addresses.*.city")
      .notEmpty()
      .withMessage("Address city is required")
      .isString()
      .withMessage("Address city must be a valid string")
      .isLength({ min: 2, max: 50 })
      .withMessage("Address city must be between 2 and 50 characters long")
      .trim()
      .escape(),

    check("addresses.*.address")
      .notEmpty()
      .withMessage("Address is required")
      .isString()
      .withMessage("Address must be a valid string")
      .isLength({ min: 5, max: 100 })
      .withMessage("Address must be between 5 and 100 characters long")
      .trim()
      .escape(),

    check("addresses.*.zipCode")
      .notEmpty()
      .withMessage("Address zip code is required")
      .isString()
      .withMessage("Address zip code must be a valid string")
      .matches(zipCodeRegex)
      .withMessage(
        "Address zip code must be in a valid format (e.g., 12345 or 12345-6789)"
      ),

    check("addresses.*.addressType")
      .notEmpty()
      .withMessage("Address type is required")
      .isString()
      .withMessage("Address type must be a valid string")
      .isIn(["Home", "Office", "Business"])
      .withMessage("Address type must be one of: Home, Office, Business"),

    check("monthlyContributions")
      .optional()
      .isArray()
      .withMessage("Monthly contributions must be an array"),

    check("agree")
      .notEmpty()
      .withMessage("Agreement is required")
      .isBoolean()
      .withMessage("Agreement must be a boolean value (true/false)"),
  ];
};

export default validateRegister;
