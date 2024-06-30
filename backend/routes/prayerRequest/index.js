import express from "express";
import {
  createPrayerRequest,
  deletePrayerRequest,
  getAllPrayers,
  getSinglePrayer,
  totalNumberOfPrayerRequests,
} from "../../controllers/prayerRequest/index.js";

// Prayer Service Router
const prayerRequestRouter = express.Router();

// Prayer service routes
prayerRequestRouter.post("/:userId/new-prayer-request", createPrayerRequest);
prayerRequestRouter.get("/:id", getSinglePrayer);
prayerRequestRouter.get("/", getAllPrayers);
prayerRequestRouter.delete("/:userId/:id", deletePrayerRequest);
prayerRequestRouter.get("/size/total", totalNumberOfPrayerRequests);

// Export prayer service router
export default prayerRequestRouter;
