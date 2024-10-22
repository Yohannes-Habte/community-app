import express from "express";
import {
  createAddressType,
  getAllAddressTypes,
} from "../../controllers/addressType/index.js";
import validateAddressType from "../../validators/addressType/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";

// Address Type Router
const addressTypeRouter = express.Router();

// Address Type Routes
addressTypeRouter.post(
  "/new",
  isAuthenticated,
  isAdmin,
  validateAddressType(),
  checkValidation,
  createAddressType
);

addressTypeRouter.get("/", getAllAddressTypes);

// Export Address Type Router
export default addressTypeRouter;
