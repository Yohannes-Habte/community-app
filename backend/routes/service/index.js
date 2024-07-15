import express from "express";
import {
  createServiceRequest,
  deleteSingleService,
  getAllServices,
  getSingleService,
  totalNumberOfServices,
} from "../../controllers/service/index.js";
import serviceValidation from "../../validators/service/index.js";
import checkValidation from "../../validators/validationResult/index.js";

// Prayer Service Router
const serviceRouter = express.Router();

// Prayer service routes
serviceRouter.post(
  "/:userId/new",
  serviceValidation(),
  checkValidation,
  createServiceRequest
);

serviceRouter.get("/", getAllServices);
serviceRouter.get("/:id", getSingleService);
serviceRouter.delete("/:userId/:id", deleteSingleService);
serviceRouter.get("/size/total", totalNumberOfServices);

// Export prayer service router
export default serviceRouter;
