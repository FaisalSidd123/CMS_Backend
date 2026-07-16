import express from 'express';
import { 
  getLeads, 
  getLead, 
  createLead, 
  updateLead, 
  deleteLead 
} from '../controllers/leadController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getLeads)
  .post(protect, authorize('admin', 'agent'), createLead);

router.route('/:id')
  .get(getLead)
  .put(protect, authorize('admin', 'agent'), updateLead)
  .delete(protect, authorize('admin'), deleteLead);

export default router;
