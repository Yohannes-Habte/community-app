import express from 'express';
import {
  deleteCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMember,
  loginCommitteeMember,
  registerCommitteMember,
  serviceFacilitator,
  updateCommitteeMemberBiodata,
} from '../controllers/committeeController.js';

// Committee Router
const committeeRouter = express.Router();

// committee Routes
committeeRouter.post('/register', registerCommitteMember);
committeeRouter.post('/login', loginCommitteeMember);
committeeRouter.put('/:id', updateCommitteeMemberBiodata);
committeeRouter.get('/:id', getCommitteeMember);
committeeRouter.delete('/:id', deleteCommitteeMember);
committeeRouter.get('/:id/facilitator', serviceFacilitator);
committeeRouter.get('/', getAllCommitteeMembers);

// Export Committee Router
export default committeeRouter;
