import express from "express";
import {
  deleteUserAddress,
  getAllUsers,
  getSingleUser,
  totalNumberOfParishioners,
  updateUserAddress,
} from "../../controllers/member/index.js";

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.put("/:id/update-address", updateUserAddress);
memberRouter.delete("/:userId/address/:addressId", deleteUserAddress);
memberRouter.get("/:id", getSingleUser);
memberRouter.get("/", getAllUsers);
memberRouter.get("/size/total", totalNumberOfParishioners);

// Export user router
export default memberRouter;
