import express from 'express';
import { 
  getDocuments, 
  getDocument, 
  createDocument, 
  updateDocument, 
  deleteDocument 
} from '../controllers/documentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getDocuments)
  .post(protect, authorize('admin'), createDocument);

router.route('/:id')
  .get(getDocument)
  .put(protect, authorize('admin'), updateDocument)
  .delete(protect, authorize('admin'), deleteDocument);

export default router;
