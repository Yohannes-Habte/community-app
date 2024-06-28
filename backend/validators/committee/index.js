import { check } from "express-validator";
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]([0-9]{3})[-. ]([0-9]{4})$/;

const registerValidator = () => {
  return [
    check("fullName")
      .trim()
      .notEmpty()
      .withMessage("Full name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Full name must be between 3 and 50 characters")
      .matches(/^[a-zA-Z]+ [a-zA-Z]+$/)
      .withMessage(
        "Full name must contain both first and last name, separated by a space"
      )
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage(
        "Full name can only contain alphabetic characters, spaces, hyphens, and apostrophes"
      )
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error("Full name must not contain numbers");
        }
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

    check("title")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 5, max: 100 })
      .withMessage("Title must be between 5 and 100 characters long")
      .matches(/^[a-zA-Z0-9 ]*$/)
      .withMessage("Title must contain only alphanumeric characters and spaces")
      .trim()
      .escape(),

    check("phone")
      .bail()
      .trim()
      .escape()
      .exists()
      .notEmpty()
      .withMessage("Phone number is required")
      .matches(phoneRegex)
      .withMessage("Invalid phone number format"),

    check("startDate")
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

    check("endDate")
      .exists()
      .withMessage("End date is required")
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
      })
      .custom((value, { req }) => {
        const startDate = new Date(req.body.startDate);
        if (startDate > new Date(value)) {
          return Promise.reject("End date must be after start date");
        }
        return Promise.resolve();
      }),

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
  ];
};

export default registerValidator;
