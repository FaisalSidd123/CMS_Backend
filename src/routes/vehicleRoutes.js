import express from 'express';
import { 
  getVehicles, 
  getVehicle, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} from '../controllers/vehicleController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.get('/', getVehicles);
router.get('/:id', getVehicle);

// Protected Routes (Required Authentication)
router.post('/', protect, authorize('agent', 'admin'), createVehicle);
router.put('/:id', protect, authorize('agent', 'admin'), updateVehicle);
router.delete('/:id', protect, authorize('admin'), deleteVehicle);

export default router;
