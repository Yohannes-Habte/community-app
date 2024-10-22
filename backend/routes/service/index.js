import express from "express";
import {
  allServices,
  createServiceRequest,
  deleteOneService,
  getAllServices,
  getPopularCategories,
  getSingleService,
  totalNumberOfServices,
  updateServiceRequest,
} from "../../controllers/service/index.js";

import {
  isAdmin,
  isAuthenticated,
  isPriest,
} from "../../middlewares/auth/auth.js";
import serviceValidation from "../../validators/service/index.js";
import checkValidation from "../../validators/validationResult/index.js";

const serviceRouter = express.Router();

// service routes
serviceRouter.post(
  "/new",
  isAuthenticated,
  serviceValidation(),
  checkValidation,
  createServiceRequest
);

serviceRouter.get("/priest", isAuthenticated, isPriest, getAllServices);

serviceRouter.get("/admin", isAuthenticated, isAdmin, allServices);

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
