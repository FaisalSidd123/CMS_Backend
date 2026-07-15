import express from 'express';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

const router = express.Router();

// @desc    Upload Single Asset (Image/Document) to Cloudinary
// @route   POST /api/upload
// @access  Public (for easy frontend calls)
router.post('/', async (req, res, next) => {
  try {
    const { file, folder, resourceType } = req.body;

    if (!file) {
      return next(new ErrorResponse('Please provide a base64 encoded file string.', 400));
    }

    const uploadResult = await uploadToCloudinary(file, folder || 'vanguard_motors', resourceType || 'auto');

    if (!uploadResult.success) {
      return next(new ErrorResponse(uploadResult.error, 500));
    }

    res.status(200).json({
      success: true,
      url: uploadResult.url,
      publicId: uploadResult.publicId
    });
  } catch (err) {
    next(err);
  }
});

export default router;
