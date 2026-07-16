import express from 'express';
import { 
  getServiceRecords, 
  getServiceRecord, 
  createServiceRecord, 
  updateServiceRecord, 
  deleteServiceRecord 
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getServiceRecords)
  .post(protect, authorize('admin'), createServiceRecord);

router.route('/:id')
  .get(getServiceRecord)
  .put(protect, authorize('admin'), updateServiceRecord)
  .delete(protect, authorize('admin'), deleteServiceRecord);

export default router;
