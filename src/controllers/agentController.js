import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// @desc    Get All Agents
// @route   GET /api/agents
export const getAgents = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('agents')
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

// @desc    Get Single Agent
// @route   GET /api/agents/:id
export const getAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Agent not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Agent profile
// @route   POST /api/agents
export const createAgent = async (req, res, next) => {
  try {
    const { name, email, phone, status, role, commission_rate, avatar_url } = req.body;

    const { data, error } = await supabase
      .from('agents')
      .insert([{ name, email, phone, status, role, commission_rate, avatar_url }])
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

// @desc    Update Agent profile
// @route   PUT /api/agents/:id
export const updateAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, status, role, commission_rate, avatar_url } = req.body;

    const { data, error } = await supabase
      .from('agents')
      .update({ name, email, phone, status, role, commission_rate, avatar_url })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 400));
    if (!data) return next(new ErrorResponse(`Agent not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Agent profile
// @route   DELETE /api/agents/:id
export const deleteAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) return next(new ErrorResponse(error.message, 500));
    if (!data) return next(new ErrorResponse(`Agent not found with ID ${id}`, 404));

    res.status(200).json({
      success: true,
      message: `Agent ${id} successfully deleted.`
    });
  } catch (err) {
    next(err);
  }
};
