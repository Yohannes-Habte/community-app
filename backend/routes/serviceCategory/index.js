import express from "express";
import {
  countCategories,
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "../../controllers/serviceCategory/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";

// Export service category router
const serviceCategoryRouter = express.Router();

// Export service category routes
serviceCategoryRouter.post("/new", isAuthenticated, isAdmin, createCategory);

serviceCategoryRouter.get("/", getCategories);

serviceCategoryRouter.get("/:id", getCategory);

serviceCategoryRouter.delete("/:id", isAuthenticated, isAdmin, deleteCategory);

serviceCategoryRouter.get(
  "/total/count",
  isAuthenticated,
  isAdmin,
  countCategories
);

// Export service category router
export default serviceCategoryRouter;
