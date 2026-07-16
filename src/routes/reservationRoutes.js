import express from 'express';
import { 
  getReservations, 
  getReservation, 
  createReservation, 
  updateReservation, 
  deleteReservation 
} from '../controllers/reservationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getReservations)
  .post(protect, authorize('admin'), createReservation);

router.route('/:id')
  .get(getReservation)
  .put(protect, authorize('admin'), updateReservation)
  .delete(protect, authorize('admin'), deleteReservation);

export default router;
