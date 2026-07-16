import express from 'express';
import { 
  getAgents, 
  getAgent, 
  createAgent, 
  updateAgent, 
  deleteAgent 
} from '../controllers/agentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getAgents)
  .post(protect, authorize('admin'), createAgent);

router.route('/:id')
  .get(getAgent)
  .put(protect, authorize('admin'), updateAgent)
  .delete(protect, authorize('admin'), deleteAgent);

export default router;
