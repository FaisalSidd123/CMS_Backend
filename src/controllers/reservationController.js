import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get All Reservations
// @route   GET /api/reservations
export const getReservations = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*, vehicles(*), leads(*), agents(*)')
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

// @desc    Get Single Reservation
// @route   GET /api/reservations/:id
export const getReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('reservations')
      .select('*, vehicles(*), leads(*), agents(*)')
      .eq('id', id)
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Reservation not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Reservation
// @route   POST /api/reservations
export const createReservation = async (req, res, next) => {
  try {
    const { vehicle_id, lead_id, agent_id, deposit_amount, status, hold_expires_at, cancellation_reason, invoice } = req.body;

    // Check if vehicle exists and is available
    const { data: vehicle, error: vErr } = await supabase
      .from('vehicles')
      .select('status')
      .eq('id', vehicle_id)
      .maybeSingle();

    if (vErr || !vehicle) return next(new ErrorResponse('Selected vehicle not found.', 404));
    if (vehicle.status !== 'available') return next(new ErrorResponse('Vehicle is currently not available for reservation.', 400));

    const { data, error } = await supabase
      .from('reservations')
      .insert([{ vehicle_id, lead_id, agent_id, deposit_amount, status, hold_expires_at, cancellation_reason: cancellation_reason || null, invoice: invoice || null }])
      .select()
      .single();

    if (error) return next(new ErrorResponse(error.message, 400));

    // Update vehicle status to reserved
    await supabase.from('vehicles').update({ status: 'reserved' }).eq('id', vehicle_id);

    res.status(201).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Reservation
// @route   PUT /api/reservations/:id
export const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { vehicle_id, lead_id, agent_id, deposit_amount, status, hold_expires_at, cancellation_reason, invoice } = req.body;

    const { data, error } = await supabase
      .from('reservations')
      .update({ vehicle_id, lead_id, agent_id, deposit_amount, status, hold_expires_at, cancellation_reason, invoice })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 400));
    if (!data) return next(new ErrorResponse(`Reservation not found with ID ${id}`, 404));

    // If reservation status is updated to expired/cancelled, release the vehicle
    if (status === 'expired' || status === 'cancelled') {
      await supabase.from('vehicles').update({ status: 'available' }).eq('id', data.vehicle_id);
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Reservation
// @route   DELETE /api/reservations/:id
export const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Reservation not found with ID ${id}`, 404));

    // Restore vehicle status back to available
    await supabase.from('vehicles').update({ status: 'available' }).eq('id', data.vehicle_id);

    res.status(200).json({
      success: true,
      message: `Reservation ${id} successfully deleted.`
    });
  } catch (err) {
    next(err);
  }
};
