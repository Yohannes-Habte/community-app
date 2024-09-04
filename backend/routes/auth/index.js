import express from "express";
import {
  loginUser,
  registerUser,
  updateUser,
  userChangePassword,
  userLogout,
} from "../../controllers/auth/index.js";
import validateRegister from "../../validators/auth/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import { isAuthenticated } from "../../middlewares/auth/auth.js";

// Auth User Router
const authUserRouter = express.Router();

// User Routes
authUserRouter.post(
  "/register",
  validateRegister(),
  checkValidation,
  registerUser
);
authUserRouter.post("/login", loginUser);
authUserRouter.put("/update",  isAuthenticated,  updateUser);
authUserRouter.get("/logout", userLogout);
authUserRouter.put("/change-password/:id", userChangePassword);

// Export Auth User Router
export default authUserRouter;
