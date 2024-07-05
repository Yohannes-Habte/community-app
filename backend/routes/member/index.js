import express from "express";
import {
  deleteUserAddress,
  getAllUsers,
  getMemberBySearch,
  getSingleUser,
  updateUserAddress,
} from "../../controllers/member/index.js";

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.get("/", getAllUsers);
memberRouter.get("/search/user", getMemberBySearch );
memberRouter.put("/:id/update-address", updateUserAddress);
memberRouter.delete("/:userId/address/:addressId", deleteUserAddress);
memberRouter.get("/:id", getSingleUser);

// Export user router
export default memberRouter; 
