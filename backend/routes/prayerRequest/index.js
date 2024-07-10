import express from "express";
import {
  createPrayerRequest,
  deletePrayerRequest,
  getAllPrayers,
  getSinglePrayer,
  totalNumberOfPrayerRequests,
} from "../../controllers/prayerRequest/index.js";
import serviceValidation from "../../validators/service/index.js";
import checkValidation from "../../validators/validationResult/index.js";

// Prayer Service Router
const prayerRequestRouter = express.Router();

// Prayer service routes
prayerRequestRouter.post(
  "/:userId/new-prayer-request",
  serviceValidation(),
  checkValidation,
  createPrayerRequest
);
prayerRequestRouter.get("/:id", getSinglePrayer);
prayerRequestRouter.get("/", getAllPrayers);
prayerRequestRouter.delete("/:userId/:id", deletePrayerRequest);
prayerRequestRouter.get("/size/total", totalNumberOfPrayerRequests);

// Export prayer service router
export default prayerRequestRouter;
