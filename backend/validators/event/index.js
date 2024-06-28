import { check } from "express-validator";

const registerValidator = () => {
  return [
    check("eventName")
      .exists({ checkNull: true })
      .notEmpty()
      .withMessage("Event name is required")
      .trim()
      .isString()
      .withMessage("Event name must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Event name must contain only alphabetic characters")
      .isLength({ min: 2, max: 30 })
      .withMessage("Event name must be between 2 and 30 characters long"),

    check("eventPurpose")
      .exists({ checkFalsy: true })
      .withMessage("Event purpose is required")
      .trim()
      .isLength({ min: 50, max: 1000 })
      .withMessage("Event purpose must be between 50 and 500 characters")
      .escape()
      .matches(/^[a-zA-Z0-9\s\-.,?!]+$/)
      .withMessage(
        "Event purpose can only contain letters, numbers, spaces, and basic punctuation"
      ),

    check("eventOrganizer")
      .exists({ checkNull: true })
      .notEmpty()
      .withMessage("Event organizer is required")
      .trim()
      .isString()
      .withMessage("Event organizer must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Event organizer must contain only alphabetic characters")
      .isLength({ min: 2, max: 30 })
      .withMessage("Event organizer must be between 2 and 30 characters long"),

    check("eventFacilitator")
      .exists({ checkNull: true })
      .notEmpty()
      .withMessage("Event facilitator is required")
      .trim()
      .isString()
      .withMessage("Event facilitator must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Event facilitator must contain only alphabetic characters")
      .isLength({ min: 2, max: 30 })
      .withMessage(
        "Event facilitator must be between 2 and 30 characters long"
      ),

    check("eventAddress")
      .exists({ checkNull: true })
      .notEmpty()
      .withMessage("Event address is required")
      .trim()
      .isString()
      .withMessage("Event address must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Event address must contain only alphabetic characters")
      .isLength({ min: 30, max: 100 })
      .withMessage("Event address must be between 50 and 100 characters long"),

    check("eventDate")
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
  ];
};

export default registerValidator;
