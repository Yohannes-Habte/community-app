import express from "express";
import {
  createSacrament,
  deleteSacrament,
  getAllSacraments,
  getSingleSacrament,
  totalNumberOfSacraments,
} from "../../controllers/sacrament/index.js";

// Sacrament Router
const sacramentRouter = express.Router();

// Sacrament routes
sacramentRouter.post("/:userId/new-sacrament", createSacrament);
sacramentRouter.get("/:id", getSingleSacrament);
sacramentRouter.get("/", getAllSacraments);
sacramentRouter.delete("/:userId/:id", deleteSacrament);
sacramentRouter.get("/size/total", totalNumberOfSacraments);

// Export sacrament router
export default sacramentRouter;
