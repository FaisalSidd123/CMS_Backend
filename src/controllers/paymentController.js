import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get All Payments
// @route   GET /api/payments
export const getPayments = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*, vehicles(make, model, price), leads(name, email)')
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

// @desc    Get Single Payment Record
// @route   GET /api/payments/:id
export const getPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('payments')
      .select('*, vehicles(*), leads(*)')
      .eq('id', id)
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Payment record not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Payment Entry
// @route   POST /api/payments
export const createPayment = async (req, res, next) => {
  try {
    const { vehicle_id, lead_id, amount, payment_method, payment_status, due_date, paid_at } = req.body;

    const { data, error } = await supabase
      .from('payments')
      .insert([{ vehicle_id, lead_id, amount, payment_method, payment_status, due_date, paid_at }])
      .select()
      .single();

    if (error) return next(new ErrorResponse(error.message, 400));

    // If payment status is marked completed/paid, we automatically mark the vehicle status as sold
    if (payment_status === 'completed') {
      await supabase.from('vehicles').update({ status: 'sold' }).eq('id', vehicle_id);
    }

    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Payment Record
// @route   PUT /api/payments/:id
export const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { vehicle_id, lead_id, amount, payment_method, payment_status, due_date, paid_at } = req.body;

    const { data, error } = await supabase
      .from('payments')
      .update({ vehicle_id, lead_id, amount, payment_method, payment_status, due_date, paid_at })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 400));
    if (!data) return next(new ErrorResponse(`Payment record not found with ID ${id}`, 404));

    // Sync vehicle status if status becomes completed
    if (payment_status === 'completed') {
      await supabase.from('vehicles').update({ status: 'sold' }).eq('id', data.vehicle_id);
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Payment Record
// @route   DELETE /api/payments/:id
export const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Payment record not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      message: `Payment record ${id} successfully deleted.`
    });
  } catch (err) {
    next(err);
  }
};
