import express from "express";
import {
  createCommittee,
  deleteCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMember,
  getCommitteesByServiceYearRange,
  loginCommitteeMember,
  serviceFacilitator,
  updateCommitteeMember,
} from "../../controllers/committee/index.js";

// Committee Router
const committeeRouter = express.Router();

// committee Routes
committeeRouter.post("/register", createCommittee);
committeeRouter.get("/", getAllCommitteeMembers);
committeeRouter.get("/committee", getCommitteesByServiceYearRange);
committeeRouter.post("/login", loginCommitteeMember);
committeeRouter.put("/:id", updateCommitteeMember);
committeeRouter.get("/:id", getCommitteeMember);
committeeRouter.delete("/:id", deleteCommitteeMember);
committeeRouter.get("/:id/facilitator", serviceFacilitator);

// Export Committee Router
export default committeeRouter;