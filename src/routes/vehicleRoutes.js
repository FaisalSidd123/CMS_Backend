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

// CRUD Routes (Public in development for direct frontend CRUD testing)
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;
