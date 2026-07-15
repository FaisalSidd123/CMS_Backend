import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get All CSV Import Logs
// @route   GET /api/imports
export const getImportLogs = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('import_logs')
      .select('*')
      .order('id', { ascending: false });

    if (error) return next(new ErrorResponse(error.message, 500));

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create CSV Import Log Entry
// @route   POST /api/imports
export const createImportLog = async (req, res, next) => {
  try {
    const { filename, row_count, status, imported_by } = req.body;

    const { data, error } = await supabase
      .from('import_logs')
      .insert([{ filename, row_count, status, imported_by }])
      .select()
      .single();

    if (error) return next(new ErrorResponse(error.message, 400));

    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};
