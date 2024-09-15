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

const massRouter = express.Router();

massRouter.post("/new", createMass);
massRouter.get("/", getAllMasses);
massRouter.get("/upcoming", getUpcomingMasses);
massRouter.get("/:id", getMassById);
massRouter.put("/:id", updateMass);
massRouter.delete("/:id", deleteMass);
massRouter.post("/:id/register", registerForMass);

export default massRouter;
