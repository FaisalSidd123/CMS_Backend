import express from 'express';
import { getImportLogs, createImportLog } from '../controllers/importController.js';

const router = express.Router();

router.route('/')
  .get(getImportLogs)
  .post(createImportLog);

export default router;
