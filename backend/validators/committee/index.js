import { check } from "express-validator";

const validateCommittee = () => {
  return [
    check("fullName")
      .isString()
      .withMessage("Full name must be a string")
      .isLength({ min: 2, max: 60 })
      .withMessage("Full name must be between 2 and 60 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage(
        "Full name can only contain alphabetic characters and spaces"
      )
      .matches(/^[a-zA-Z]+ [a-zA-Z]+$/)
      .withMessage(
        "Full name must contain both first and last name, separated by a space"
      )
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Full name is required")
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error("Full name must not contain numbers");
        }
        return true;
      }),

    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is required")
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long")
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
      .withMessage("Password is required"),

    check("title")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 2, max: 100 })
      .withMessage("Title must be between 2 and 100 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Title can only contain alphabetic characters and spaces")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Title is required"),

    check("phone")
      .isString()
      .withMessage("Phone number must be a string")
      .matches(/^[0-9]{10,15}$/)
      .withMessage("Phone number must be between 10 and 15 digits")
      .escape()
      .notEmpty()
      .withMessage("Phone number is required"),

    check("startingTime")
      .isDate()
      .withMessage("Starting time must be a valid date")
      .custom((value) => {
        if (new Date(value) < new Date()) {
          throw new Error(
            "Starting time must be the current date or a future date"
          );
        }
        return true;
      })

      .notEmpty()
      .withMessage("Starting time is required"),

    check("endingTime")
      .isDate()
      .withMessage("Ending time must be a valid date")
      .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.startingTime)) {
          throw new Error("Ending time must be after starting time");
        }
        return true;
      })
      .notEmpty()
      .withMessage("Ending time is required"),

    check("image")
      .isString()
      .withMessage("Image URL must be a string")
      .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/)
      .withMessage("Image URL must be a valid URL")
      .notEmpty()
      .withMessage("Image URL is required"),
  ];
};

export default validateCommittee;
