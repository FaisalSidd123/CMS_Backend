import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get All Documents
// @route   GET /api/documents
export const getDocuments = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*, vehicles(make, model), leads(name)')
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

// @desc    Get Single Document
// @route   GET /api/documents/:id
export const getDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('documents')
      .select('*, vehicles(*), leads(*)')
      .eq('id', id)
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Document not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Document Log
// @route   POST /api/documents
export const createDocument = async (req, res, next) => {
  try {
    const { title, document_type, file_url, vehicle_id, lead_id, status } = req.body;

    const { data, error } = await supabase
      .from('documents')
      .insert([{ title, document_type, file_url, vehicle_id, lead_id, status }])
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

// @desc    Update Document Status/Details
// @route   PUT /api/documents/:id
export const updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, document_type, file_url, vehicle_id, lead_id, status } = req.body;

    const { data, error } = await supabase
      .from('documents')
      .update({ title, document_type, file_url, vehicle_id, lead_id, status })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 400));
    if (!data) return next(new ErrorResponse(`Document not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Document
// @route   DELETE /api/documents/:id
export const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Document not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      message: `Document ${id} successfully deleted.`
    });
  } catch (err) {
    next(err);
  }
};
