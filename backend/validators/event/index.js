import { check } from "express-validator";

const validateEvent = () => {
  return [
    check("eventName")
      .isString()
      .withMessage("Event name must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Event name must be between 3 and 100 characters")
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage(
        "Event name can only contain alphanumeric characters and spaces"
      )
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Event name is required"),

    check("eventPurpose")
      .isString()
      .withMessage("Event purpose must be a string")
      .isLength({ min: 10, max: 500 })
      .withMessage("Event purpose must be between 10 and 500 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Event purpose is required"),

    check("eventOrganizer")
      .isString()
      .withMessage("Event organizer must be a string")
      .isLength({ min: 2, max: 30 })
      .withMessage("Event organizer must be between 2 and 30 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Event organizer is required"),

    check("eventFacilitator")
      .isString()
      .withMessage("Event facilitator must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Event facilitator must be between 3 and 100 characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Event facilitator is required"),

    check("eventAddress")
      .isString()
      .withMessage("Event address must be a string")
      .isLength({ min: 10, max: 200 })
      .withMessage("Event address must be between 10 and 200 characters")
      .matches(/^[a-zA-Z0-9\s,.'-]+$/)
      .withMessage("Event address contains invalid characters")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Event address is required"),

    check("eventDate")
      .isDate()
      .withMessage("Event date must be a valid date")
      .custom((value) => {
        if (new Date(value) < new Date()) {
          throw new Error("Event date must be a future date");
        }
        return true;
      })
      .notEmpty()
      .withMessage("Event date is required"),
  ];
};

export default validateEvent;
