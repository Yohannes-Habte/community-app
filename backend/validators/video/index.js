import { body } from "express-validator";

const validateVideo = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required.")
      .isString()
      .withMessage("Title must be a valid string.")
      .trim()
      .escape()
      .isLength({ min: 2, max: 100 })
      .withMessage("Title must be between 2 and 100 characters long."),

    body("description")
      .notEmpty()
      .withMessage("Description is required.")
      .isString()
      .withMessage("Description must be a valid string.")
      .trim()
      .escape()
      .isLength({ min: 10, max: 1000 })
      .withMessage("Description must be between 10 and 1000 characters long."),

    body("videoUrl")
      .notEmpty()
      .withMessage("Video URL is required.")
      .isURL()
      .withMessage("Video URL must be a valid URL.")
      .trim()
      .escape()
      .isLength({ max: 255 })
      .withMessage("Video URL cannot exceed 255 characters."),
  ];
};

export default validateVideo;
