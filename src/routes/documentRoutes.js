import express from 'express';
import { 
  getDocuments, 
  getDocument, 
  createDocument, 
  updateDocument, 
  deleteDocument 
} from '../controllers/documentController.js';

const router = express.Router();

router.route('/')
  .get(getDocuments)
  .post(createDocument);

router.route('/:id')
  .get(getDocument)
  .put(updateDocument)
  .delete(deleteDocument);

export default router;
