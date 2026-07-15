import express from 'express';
import { 
  getServiceRecords, 
  getServiceRecord, 
  createServiceRecord, 
  updateServiceRecord, 
  deleteServiceRecord 
} from '../controllers/serviceController.js';

const router = express.Router();

router.route('/')
  .get(getServiceRecords)
  .post(createServiceRecord);

router.route('/:id')
  .get(getServiceRecord)
  .put(updateServiceRecord)
  .delete(deleteServiceRecord);

export default router;
