import express from 'express';
import { 
  getReservations, 
  getReservation, 
  createReservation, 
  updateReservation, 
  deleteReservation 
} from '../controllers/reservationController.js';

const router = express.Router();

router.route('/')
  .get(getReservations)
  .post(createReservation);

router.route('/:id')
  .get(getReservation)
  .put(updateReservation)
  .delete(deleteReservation);

export default router;
