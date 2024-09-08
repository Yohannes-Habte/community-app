import express from "express";
import {
  createPriestDelegation,
  getAllDelegatedPriests,
} from "../../controllers/priestDelegation/index.js";
import validatePriest from "../../validators/priestDelegation/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import {
  isAdmin,
  isAuthenticated,
  isPriest,
} from "../../middlewares/auth/auth.js";

// Priest Delegation Router
const priestDelegationRouter = express.Router();

// Priest Delegation routes
priestDelegationRouter.post(
  "/:priestId/delegate",
  isAuthenticated,
  isPriest,
  validatePriest(),
  checkValidation,
  createPriestDelegation
);
priestDelegationRouter.get(
  "/priests",
  isAuthenticated,
  isAdmin,
  getAllDelegatedPriests
);

// Export Priest Delegation router
export default priestDelegationRouter;
