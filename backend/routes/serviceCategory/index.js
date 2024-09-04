import express from "express";
import {
  createCategory,
  getCategories,
} from "../../controllers/serviceCategory/index.js";

// Export service category router
const serviceCategoryRouter = express.Router();

// Export service category routes
serviceCategoryRouter.post("/new", createCategory);

serviceCategoryRouter.get("/", getCategories);

serviceCategoryRouter.get("/:id");

serviceCategoryRouter.delete("/:id");

serviceCategoryRouter.get("total/count");

// Export service category router
export default serviceCategoryRouter;
