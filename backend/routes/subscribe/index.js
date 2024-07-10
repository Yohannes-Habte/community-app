import express from "express";
import {
  createSubscriber,
  sendNotifications,
} from "../../controllers/subscriber/index.js";

const subscribeRouter = express.Router();

subscribeRouter.post("/new", createSubscriber);
subscribeRouter.post("/notify", sendNotifications);

export default subscribeRouter;
