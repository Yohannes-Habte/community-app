import express from "express";
import {
  countMembers,
  deleteUserAccount,
  deleteUserAddress,
  getAllUsers,
  getAllUserServices,
  getMemberBySearch,
  getSingleUser,
  updateUserAddress,
} from "../../controllers/member/index.js";
import {
  isAdmin,
  isAuthenticated,
  isFinanceManager,
  isPriest,
} from "../../middlewares/auth/auth.js";

// User Router
const memberRouter = express.Router();

// User Route
memberRouter.get("/priest", isAuthenticated, isPriest, getAllUsers);
memberRouter.get("/admin", isAuthenticated, isAdmin, getAllUsers);
memberRouter.get("/finance", isAuthenticated, isFinanceManager, getAllUsers);
memberRouter.get("/user", isAuthenticated, getSingleUser);
memberRouter.get("/search/user", getMemberBySearch);
memberRouter.get("/services", isAuthenticated, getAllUserServices);
memberRouter.get("/count/total", countMembers);
memberRouter.put("/update/address", isAuthenticated, updateUserAddress);
memberRouter.delete("/address/:id", isAuthenticated, deleteUserAddress);
memberRouter.delete("/user/:id", isAuthenticated, isAdmin, deleteUserAccount);

// Export user router
export default memberRouter;
