import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get All Leads
// @route   GET /api/leads
// @access  Public (or Protected in production)
export const getLeads = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*, agents(name)')
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

// @desc    Get Single Lead
// @route   GET /api/leads/:id
// @access  Public
export const getLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('leads')
      .select('*, agents(name)')
      .eq('id', id)
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Lead not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, status, source, assigned_agent_id, notes } = req.body;

    const { data, error } = await supabase
      .from('leads')
      .insert([{ name, email, phone, status, source, assigned_agent_id, notes }])
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

// @desc    Update Lead
// @route   PUT /api/leads/:id
// @access  Public
export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, status, source, assigned_agent_id, notes } = req.body;

    const { data, error } = await supabase
      .from('leads')
      .update({ name, email, phone, status, source, assigned_agent_id, notes })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 400));
    if (!data) return next(new ErrorResponse(`Lead not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Lead
// @route   DELETE /api/leads/:id
// @access  Public
export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Lead not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      message: `Lead ${id} successfully deleted.`
    });
  } catch (err) {
    next(err);
  }
};
