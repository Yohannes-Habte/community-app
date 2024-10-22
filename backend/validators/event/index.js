import { check } from "express-validator";

const validateEvent = () => {
  return [
    check("eventName")
      .notEmpty()
      .withMessage("Event name is required")
      .isString()
      .withMessage("Event name must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Event name must be between 3 and 100 characters")
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage(
        "Event name can only contain alphanumeric characters and spaces"
      )
      .trim()
      .escape(),

    check("eventPurpose")
      .notEmpty()
      .withMessage("Event purpose is required")
      .isString()
      .withMessage("Event purpose must be a string")
      .isLength({ min: 10, max: 900 })
      .withMessage("Event purpose must be between 10 and 900 characters")
      .trim()
      .escape(),

    check("eventOrganizer")
      .notEmpty()
      .withMessage("Event organizer is required")
      .isString()
      .withMessage("Event organizer must be a string")
      .isLength({ min: 2, max: 30 })
      .withMessage("Event organizer must be between 2 and 30 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage(
        "Event organizer can only contain alphabetic characters and spaces"
      )
      .trim()
      .escape(),

    check("eventFacilitator")
      .notEmpty()
      .withMessage("Event facilitator is required")
      .isString()
      .withMessage("Event facilitator must be a string")
      .isLength({ min: 3, max: 100 })
      .withMessage("Event facilitator must be between 3 and 100 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage(
        "Event facilitator can only contain alphabetic characters and spaces"
      )
      .trim()
      .escape(),

    check("eventAddress")
      .notEmpty()
      .withMessage("Event address is required")
      .isString()
      .withMessage("Event address must be a string")
      .isLength({ min: 10, max: 200 })
      .withMessage("Event address must be between 10 and 200 characters")
      .matches(/^[a-zA-Z0-9\s,.'-]+$/)
      .withMessage(
        "Event address contains invalid characters (only letters, numbers, spaces, commas, periods, apostrophes, and hyphens allowed)"
      )
      .trim()
      .escape(),

    check("eventDate")
      .notEmpty()
      .withMessage("Event date is required")
      .isISO8601()
      .withMessage("Event date must be in a valid ISO8601 format (YYYY-MM-DD)")
      .custom((value) => {
        const currentDate = new Date();
        const eventDate = new Date(value);

        // Calculate the date that is 60 days from the current date
        const minEventDate = new Date(currentDate);
        minEventDate.setDate(currentDate.getDate() + 60);

        if (eventDate < minEventDate) {
          throw new Error("Event date must be at least 60 days in the future");
        }
        return true;
      }),
  ];
};

export default validateEvent;
