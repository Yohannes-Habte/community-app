import { body } from "express-validator";
import Mass from "../../models/mass/index.js";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const validateMass = () => {
  return [
    body("date")
      .isISO8601()
      .withMessage("Date must be a valid ISO 8601 format (YYYY-MM-DD).")
      .notEmpty()
      .withMessage("Date is required.")
      .toDate()
      .custom(async (value) => {
        const selectedDate = new Date(value);

        const today = new Date();

        if (selectedDate <= today) {
          throw new Error("Date must be in the future.");
        }

        // Extract the month and year from the selected date
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth();

        // Check if there is already a date for the same month and year in the database
        const existingMass = await Mass.findOne({
          date: {
            $gte: new Date(selectedYear, selectedMonth, 1),
            $lte: new Date(selectedYear, selectedMonth + 1, 0),
          },
        });

        if (existingMass) {
          throw new Error(
            "A Mass has already been scheduled for this month and year."
          );
        }

        return true;
      })
      .toDate(),

    body("time")
      .notEmpty()
      .withMessage("Time is required.")
      .matches(timeRegex)
      .withMessage("Time must be in HH:MM format (24-hour clock).")
      .trim(),

    body("type")
      .isIn([
        "Daily",
        "Saturday",
        "Sunday",
        "Holy Day",
        "Feast Day",
        "Special Occasion",
      ])
      .withMessage(
        "Mass type must be one of the following: Daily, Saturday, Sunday, Holy Day, Feast Day, Special Occasion."
      )
      .notEmpty()
      .withMessage("Mass type is required."),

    body("officiant")
      .notEmpty()
      .withMessage("Officiant is required.")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage(
        "Officiant name can only contain alphabetic characters and spaces."
      )
      .trim()
      .escape(),

    body("participants")
      .optional()
      .isInt({ min: 30 })
      .withMessage("Participants must be a number greater than or equal to 30.")
      .toInt(),

    body("confession")
      .notEmpty()
      .withMessage("Confession cannot be empty.")
      .isString()
      .withMessage("Confession is required.")
      .trim()
      .escape(),

    body("preMassPrayer")
      .notEmpty()
      .withMessage("Pre-Mass prayer cannot be empty.")
      .isString()
      .withMessage("Pre-Mass prayer is required.")
      .trim()
      .escape(),

    body("massStatus")
      .isIn(["upcoming", "past"])
      .withMessage("Mass status must be either 'upcoming' or 'past'.")
      .optional()
      .trim(),

    body("readings.firstReading")
      .optional()
      .isString()
      .withMessage("First reading must be a string.")
      .trim()
      .escape(),

    body("readings.psalm")
      .optional()
      .isString()
      .withMessage("Psalm must be a string.")
      .trim()
      .escape(),

    body("readings.secondReading")
      .optional()
      .isString()
      .withMessage("Second reading must be a string.")
      .trim()
      .escape(),

    body("readings.gospel")
      .optional()
      .isString()
      .withMessage("Gospel must be a string.")
      .trim()
      .escape(),

    body("location.name")
      .notEmpty()
      .withMessage("Location name cannot be empty.")
      .isString()
      .withMessage("Location name is required and must be a string.")
      .trim()
      .escape(),

    body("location.address")
      .notEmpty()
      .withMessage("Church address is required.")
      .isString()
      .withMessage("Address must be a string.")
      .trim()
      .escape(),

    body("location.coordinates.latitude")
      .notEmpty()
      .withMessage("Latitude is required.")
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be a number between -90 and 90.")
      .toFloat(),

    body("location.coordinates.longitude")
      .notEmpty()
      .withMessage("Longitude is required.")
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be a number between -180 and 180.")
      .toFloat(),

    body("attendees.*")
      .optional()
      .isMongoId()
      .withMessage("Each attendee must be a valid MongoDB ObjectId."),

    body("description")
      .notEmpty()
      .withMessage("Description is required.")
      .isString()
      .withMessage("Description must be a string.")
      .trim()
      .escape(),
  ];
};

export default validateMass;
