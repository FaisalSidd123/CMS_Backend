import express from 'express';
import { 
  getPayments, 
  getPayment, 
  createPayment, 
  updatePayment, 
  deletePayment 
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPayments)
  .post(protect, authorize('admin'), createPayment);

router.route('/:id')
  .get(getPayment)
  .put(protect, authorize('admin'), updatePayment)
  .delete(protect, authorize('admin'), deletePayment);

export default router;
