import express from "express";
import {
  createSubscriber,
  sendNotifications,
} from "../../controllers/subscriber/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import validateSubscriber from "../../validators/subscribe/index.js";

const subscribeRouter = express.Router();

subscribeRouter.post(
  "/new",
  validateSubscriber(),
  checkValidation,
  createSubscriber
);
subscribeRouter.post("/notify", sendNotifications);

export default subscribeRouter;
