import express from "express";
import {
  createPriestDelegation,
  getAllDelegatedPriests,
} from "../../controllers/priestDelegation/index.js";

// Priest Delegation Router
const priestDelegationRouter = express.Router();

// Priest Delegation routes
priestDelegationRouter.post("/:priestId/delegate", createPriestDelegation);
priestDelegationRouter.get("/priests", getAllDelegatedPriests);

// Export Priest Delegation router
export default priestDelegationRouter;
