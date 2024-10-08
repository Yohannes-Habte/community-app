import express from "express";
import { createVideo, getLastVideo } from "../../controllers/video/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";

const videoRouter = express.Router();

videoRouter.post("/new", isAuthenticated, isAdmin, createVideo);
videoRouter.get("/last/video", getLastVideo);

export default videoRouter;
