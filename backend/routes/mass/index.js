import express from "express";
import {
  createMass,
  getAllMasses,
  getUpcomingMasses,
  getMassById,
  updateMass,
  deleteMass,
  registerForMass,
} from "../../controllers/mass/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";
import validateMass from "../../validators/mass/index.js";
import checkValidation from "../../validators/validationResult/index.js";

const massRouter = express.Router();

massRouter.post(
  "/new",
  isAuthenticated,
  isAdmin,
  validateMass(),
  checkValidation,
  createMass
);
massRouter.get("/", getAllMasses);
massRouter.get("/upcoming", getUpcomingMasses);
massRouter.get("/:id", isAuthenticated, isAdmin, getMassById);
massRouter.put("/:id", isAuthenticated, isAdmin, updateMass);
massRouter.delete("/:id", isAuthenticated, isAdmin, deleteMass);
massRouter.post("/:id/register", registerForMass);

export default massRouter;
