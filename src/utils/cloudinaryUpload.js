import cloudinary from '../config/cloudinary.js';

/**
 * Upload a local file path or base64 data string to Cloudinary.
 * @param {string} fileContent - Local path, buffer, or base64 representation of the file.
 * @param {string} folder - Destination folder on Cloudinary (e.g. 'vanguard_vehicles', 'vanguard_docs').
 * @param {string} resourceType - Type of resource: 'image', 'raw' (for PDF, docs), or 'auto'.
 * @returns {Promise<object>} Cloudinary upload response containing URL details.
 */
export const uploadToCloudinary = async (fileContent, folder = 'vanguard_motors', resourceType = 'auto') => {
  try {
    const result = await cloudinary.uploader.upload(fileContent, {
      folder,
      resource_type: resourceType
    });
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary Upload Helper Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
