import express from "express";
import {
  createCommittee,
  deleteCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMember,
  getCommitteeMembers,
  getCommitteesByServiceYearRange,
  getYearRanges,
  loginCommitteeMember,
  serviceFacilitator,
  updateCommitteeMember,
} from "../../controllers/committee/index.js";
import validateCommittee from "../../validators/committee/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";

// Committee Router
const committeeRouter = express.Router();

// committee Routes
committeeRouter.post(
  "/register",
  isAuthenticated,
  isAdmin,
  validateCommittee(),
  checkValidation,
  createCommittee
);
committeeRouter.post("/login", loginCommitteeMember);
committeeRouter.get("/", getAllCommitteeMembers);
committeeRouter.get("/committee", getCommitteesByServiceYearRange);
committeeRouter.get("/years", getYearRanges);
committeeRouter.get("/members/service", getCommitteeMembers);
committeeRouter.get("/:id", isAuthenticated, isAdmin, getCommitteeMember);

committeeRouter.put("/:id", isAuthenticated, isAdmin, updateCommitteeMember);

committeeRouter.delete("/:id", isAuthenticated, isAdmin, deleteCommitteeMember);
committeeRouter.get("/:id/facilitator", serviceFacilitator);

// Export Committee Router
export default committeeRouter;
