import { check } from "express-validator";

const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10,15}$/;
const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

const validateCommittee = () => {
  return [
    check("fullName")
      .notEmpty()
      .withMessage("Full name is required")
      .isString()
      .withMessage("Full name must be a string")
      .isLength({ min: 2, max: 60 })
      .withMessage("Full name must be between 2 and 60 characters")
      .matches(nameRegex)
      .withMessage(
        "Full name can only contain alphabetic characters and spaces"
      )
      .matches(fullNameRegex)
      .withMessage(
        "Full name must contain both first and last name, separated by a space"
      )
      .trim()
      .escape()
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error("Full name must not contain numbers");
        }
        return true;
      }),

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

    check("title")
      .notEmpty()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 2, max: 100 })
      .withMessage("Title must be between 2 and 100 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Title can only contain alphabetic characters and spaces")
      .trim()
      .escape(),

    check("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isString()
      .withMessage("Phone number must be a valid string")
      .matches(phoneRegex)
      .withMessage("Phone number must be between 10 and 15 digits")
      .trim()
      .escape(),

    check("startingTime")
      .notEmpty()
      .withMessage("Starting time is required")
      .isISO8601()
      .withMessage("Starting time must be a valid date")
      .custom((value) => {
        if (new Date(value) < new Date()) {
          throw new Error(
            "Starting time must be the current date or a future date"
          );
        }
        return true;
      }),

    check("endingTime")
      .notEmpty()
      .withMessage("Ending time is required")
      .isISO8601()
      .withMessage("Ending time must be a valid date")
      .custom((value, { req }) => {
        const startingTime = new Date(req.body.startingTime);
        const endingTime = new Date(value);

        const startYear = startingTime.getFullYear();
        const startMonth = startingTime.getMonth(); // January is 0
        const startDate = startingTime.getDate(); // Day of the month

        let expectedEndingTime;

        // Check if the starting date is January 1
        if (startMonth === 0 && startDate === 1) {
          // If starting date is January 1, set end date to 31 December two years later
          const endYear = startYear + 1;
          expectedEndingTime = new Date(`${endYear}-12-31T23:59:59.999Z`);
        } else {
          // If starting date is after January 1, set end date to 31 December of the same year
          expectedEndingTime = new Date(`${startYear}-12-31T23:59:59.999Z`);
        }

        // Compare the provided ending time with the expected ending time
        if (endingTime.getTime() !== expectedEndingTime.getTime()) {
          if (startMonth === 0 && startDate === 1) {
            throw new Error(
              `Ending time must be exactly one year after the starting time, on 31 December ${
                startYear + 1
              }`
            );
          } else {
            throw new Error(`Ending time must be 31 December ${startYear}`);
          }
        }

        return true;
      }),

    check("image")
      .notEmpty()
      .withMessage("Image URL is required")
      .isString()
      .withMessage("Image URL must be a string")
      .matches(imageRegex)
      .withMessage(
        "Image URL must be a valid URL (formats allowed: png, jpg, jpeg, gif)"
      ),
  ];
};

export default validateCommittee;
