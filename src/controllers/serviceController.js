import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get All Service Records
// @route   GET /api/service
export const getServiceRecords = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('service_records')
      .select('*, vehicles(make, model, year)')
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

// @desc    Get Single Service Record
// @route   GET /api/service/:id
export const getServiceRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('service_records')
      .select('*, vehicles(*)')
      .eq('id', id)
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Service record not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Service Record
// @route   POST /api/service
export const createServiceRecord = async (req, res, next) => {
  try {
    const { vehicle_id, description, status, cost, scheduled_date, completed_date } = req.body;

    const { data, error } = await supabase
      .from('service_records')
      .insert([{ vehicle_id, description, status, cost, scheduled_date, completed_date }])
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

// @desc    Update Service Record
// @route   PUT /api/service/:id
export const updateServiceRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { vehicle_id, description, status, cost, scheduled_date, completed_date } = req.body;

    const { data, error } = await supabase
      .from('service_records')
      .update({ vehicle_id, description, status, cost, scheduled_date, completed_date })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 400));
    if (!data) return next(new ErrorResponse(`Service record not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Service Record
// @route   DELETE /api/service/:id
export const deleteServiceRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('service_records')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Service record not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      message: `Service record ${id} successfully deleted.`
    });
  } catch (err) {
    next(err);
  }
};
