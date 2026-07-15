import express from 'express';
import authRoutes from './authRoutes.js';
import vehicleRoutes from './vehicleRoutes.js';
import leadRoutes from './leadRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import agentRoutes from './agentRoutes.js';
import importRoutes from './importRoutes.js';
import documentRoutes from './documentRoutes.js';

const router = express.Router();

// Mount sub-routes
router.use('/auth', authRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/leads', leadRoutes);
router.use('/reservations', reservationRoutes);
router.use('/payments', paymentRoutes);
router.use('/service', serviceRoutes);
router.use('/agents', agentRoutes);
router.use('/imports', importRoutes);
router.use('/documents', documentRoutes);

export default router;
