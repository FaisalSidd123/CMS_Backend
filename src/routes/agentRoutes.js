import express from 'express';
import { 
  getAgents, 
  getAgent, 
  createAgent, 
  updateAgent, 
  deleteAgent 
} from '../controllers/agentController.js';

const router = express.Router();

router.route('/')
  .get(getAgents)
  .post(createAgent);

router.route('/:id')
  .get(getAgent)
  .put(updateAgent)
  .delete(deleteAgent);

export default router;
