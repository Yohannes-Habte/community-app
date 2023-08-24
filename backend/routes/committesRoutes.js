import express from 'express';
import {
  deleteCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMember,
  loginCommitteeMember,
  registerCommitteMember,
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
committeeRouter.get('/', getAllCommitteeMembers);

// Export Committee Router
export default committeeRouter;
