import express from "express";
import { createVideo, getLastVideo } from "../../controllers/video/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";
import checkValidation from "../../validators/validationResult/index.js";
import validateVideo from "../../validators/video/index.js";

const videoRouter = express.Router();

videoRouter.post(
  "/new",
  isAuthenticated,
  isAdmin,
  validateVideo(),
  checkValidation,
  createVideo
);
videoRouter.get("/last/video", getLastVideo);

export default videoRouter;
