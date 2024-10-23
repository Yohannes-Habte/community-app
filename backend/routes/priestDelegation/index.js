import express from "express";
import {
  createPriestDelegation,
  deleteDelegatedPriest,
  getAllDelegatedPriests,
  getDelegatedPriestById,
  updateDelegatedPriest,
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
  "/delegate",
  isAuthenticated,
  isPriest,
  validatePriest(),
  checkValidation,
  createPriestDelegation
);

priestDelegationRouter.get(
  "/admin",
  isAuthenticated,
  isAdmin,
  getAllDelegatedPriests
);

priestDelegationRouter.get(
  "/priest",
  isAuthenticated,
  isPriest,
  getAllDelegatedPriests
);

priestDelegationRouter.get(
  "/:id",
  isAuthenticated,
  isPriest,
  getDelegatedPriestById
);

priestDelegationRouter.put(
  "/:id",
  isAuthenticated,
  isPriest,
  updateDelegatedPriest
);

priestDelegationRouter.delete(
  "/:id",
  isAuthenticated,
  isPriest,
  deleteDelegatedPriest
);

// Export Priest Delegation router
export default priestDelegationRouter;
