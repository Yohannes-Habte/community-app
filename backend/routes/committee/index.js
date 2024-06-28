import express from "express";
import {
  createCommittee,
  deleteCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMember,
  loginCommitteeMember,
  serviceFacilitator,
  updateCommitteeMember,
} from "../../controllers/committee/index.js";

// Committee Router
const committeeRouter = express.Router();

// committee Routes
committeeRouter.post("/register", createCommittee);
committeeRouter.post("/login", loginCommitteeMember);
committeeRouter.put("/:id", updateCommitteeMember);
committeeRouter.get("/:id", getCommitteeMember);
committeeRouter.delete("/:id", deleteCommitteeMember);
committeeRouter.get("/:id/facilitator", serviceFacilitator);
committeeRouter.get("/", getAllCommitteeMembers);

// Export Committee Router
export default committeeRouter;
