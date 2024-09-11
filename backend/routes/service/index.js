import express from "express";
import {
  createServiceRequest,
  deleteOneService,
  getAllServices,
  getPopularCategories,
  getSingleService,
  totalNumberOfServices,
  updateServiceRequest,
} from "../../controllers/service/index.js";
// import serviceValidation from "../../validators/service/index.js";
// import checkValidation from "../../validators/validationResult/index.js";
import { isAuthenticated, isPriest } from "../../middlewares/auth/auth.js";

const serviceRouter = express.Router();

// service routes
serviceRouter.post("/new", isAuthenticated, createServiceRequest);

serviceRouter.get("/", isAuthenticated, isPriest, getAllServices);

serviceRouter.get("/:id", isAuthenticated, isPriest, getSingleService);

serviceRouter.put("/:id", isAuthenticated, isPriest, updateServiceRequest);

serviceRouter.delete(
  "/:serviceId",
  isAuthenticated,
  isPriest,
  deleteOneService
);

serviceRouter.get("/popular/categories", getPopularCategories);

serviceRouter.get("/size/total", totalNumberOfServices);

// Export prayer service router
export default serviceRouter;
