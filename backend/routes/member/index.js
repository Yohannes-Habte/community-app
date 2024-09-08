import express from "express";
import {
  countMembers,
  deleteUserAddress,
  getAllUsers,
  getAllUserServices,
  getMemberBySearch,
  getSingleUser,
  updateUserAddress,
} from "../../controllers/member/index.js";
import { isAdmin, isAuthenticated, isPriest } from "../../middlewares/auth/auth.js";

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.get("/", isAuthenticated, isPriest, getAllUsers);
memberRouter.get("/all", isAuthenticated, isAdmin, getAllUsers);
memberRouter.get("/user", isAuthenticated, getSingleUser);
memberRouter.get("/search/user", getMemberBySearch );
memberRouter.get("/services", isAuthenticated, getAllUserServices );
memberRouter.get("/count/total", countMembers );
memberRouter.put("/:id/update-address", updateUserAddress);
memberRouter.delete("/:userId/address/:addressId", deleteUserAddress);

// Export user router
export default memberRouter; 
