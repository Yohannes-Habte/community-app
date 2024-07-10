import { check } from "express-validator";
// Phone validation
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]([0-9]{3})[-. ]([0-9]{4})$/;

const registerValidator = () => {
  return [
    check("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .trim()
      .isString()
      .withMessage("First name must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("First name must contain only alphabetic characters")
      .isLength({ min: 2, max: 30 })
      .withMessage("First name must be between 2 and 30 characters long"),

    check("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .trim()
      .isString()
      .withMessage("Last name must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Last name must contain only alphabetic characters")
      .isLength({ min: 2, max: 30 })
      .withMessage("Last name must be between 2 and 30 characters long"),

    check("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Please select an image");
      }

      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        throw new Error("Only JPG, PNG, and GIF images are allowed");
      }

      // Check for maximum file size (in bytes)
      if (req.file.size > 1024 * 1024 * 5) {
        // 5MB limit
        throw new Error("Image size cannot exceed 5MB");
      }

      // You can add further checks here:
      // - Minimum dimensions using image processing library (e.g., sharp)
      // - Aspect ratio validation

      return true;
    }),

    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .withMessage("Email format is invalid")
      .normalizeEmail()
      .trim()
      .custom((value) => {
        const domain = value.split("@")[1];
        const blockedDomains = ["spam.com", "fake.com"]; // Add more blocked domains as needed
        if (blockedDomains.includes(domain)) {
          throw new Error("Email domain is not allowed");
        }
        return true;
      }),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])/)
      .withMessage(
        "Password must contain a lowercase letter, uppercase letter, number, and special character."
      ),
    check("phone")
      .bail()
      .trim()
      .escape()
      .exists()
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(phoneRegex)
      .withMessage("Invalid phone number format"),

    check("street")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Street address is required")
      .isLength({ min: 5, max: 100 })
      .withMessage("Street address must be between 5 and 100 characters long")
      .matches(/^[a-zA-Z0-9\s,.'-]+$/)
      .withMessage("Street address contains invalid characters"),

    check("zipCode")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("Zip code is required")
      .isLength({ max: 12 })
      .withMessage("Zip code exceeds maximum length")
      .withMessage("Zip code is required")
      .matches(/^\d{5}(-\d{4})?$|^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/)
      .withMessage("Invalid zip code format"),

    check("city")
      .exists()
      .notEmpty()
      .withMessage("City name is required")
      .isLength({ min: 2, max: 100 })
      .withMessage("City name must be between 2 and 100 characters long")
      .trim()
      .escape()
      .matches(/^[a-zA-Z\u00C0-\u00FF\s\-']+$/)
      .withMessage("City name contains invalid characters"), // Allow letters, accented characters, spaces, hyphens, and apostrophes,

    check("state")
      .exists()
      .notEmpty()
      .withMessage("State is required")
      .trim()
      .toUpperCase()
      .isLength({ max: 2 })
      .withMessage("State abbreviation exceeds maximum length"),

    check("country")
      .exists()
      .notEmpty()
      .withMessage("Country is required")
      .isLength({ min: 2, max: 30 })
      .withMessage("Country must be between 2 and 30 characters"),
  ];
};

export default registerValidator;
