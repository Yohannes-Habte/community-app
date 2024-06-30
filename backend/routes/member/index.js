import express from "express";
import {
  deleteUserAddress,
  getAllUsers,
  getSingleUser,
  updateUserAddress,
} from "../../controllers/member/index.js";

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.put("/:id/update-address", updateUserAddress);
memberRouter.delete("/:userId/address/:addressId", deleteUserAddress);
memberRouter.get("/:id", getSingleUser);
memberRouter.get("/", getAllUsers);

// Export user router
export default memberRouter; 
