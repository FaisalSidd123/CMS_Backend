import { supabase } from '../config/db.js';
import { ErrorResponse } from '../middleware/errorHandler.js';

// Helper to map snake_case Postgres columns to frontend camelCase keys
const mapToCamelCase = (v) => {
  if (!v) return null;
  return {
    id: Number(v.id),
    make: v.make,
    model: v.model,
    year: v.year,
    price: typeof v.price === 'number' ? `$${Math.round(v.price).toLocaleString()}` : v.price,
    mileage: typeof v.mileage === 'number' ? `${Math.round(v.mileage).toLocaleString()} mi` : v.mileage,
    bodyType: v.body_type,
    color: v.color,
    location: v.location,
    status: v.status,
    dateAdded: v.date_added,
    specs: v.specs,
    conditionNotes: v.condition_notes,
    thumbnailImage: v.thumbnail_image,
    images: v.images
  };
};

// Helper to map frontend camelCase keys to snake_case Postgres columns for writes
const mapToSnakeCase = (body) => {
  const result = {};
  if (body.make !== undefined) result.make = body.make;
  if (body.model !== undefined) result.model = body.model;
  if (body.year !== undefined) result.year = body.year;
  
  if (body.price !== undefined) {
    // Parse numeric value (e.g. "$68,000" -> 68000)
    const rawPrice = typeof body.price === 'string' 
      ? parseFloat(body.price.replace(/[$,]/g, '')) 
      : body.price;
    result.price = isNaN(rawPrice) ? 0 : rawPrice;
  }
  
  if (body.mileage !== undefined) {
    // Parse numeric value (e.g. "12,400 mi" -> 12400)
    const rawMileage = typeof body.mileage === 'string' 
      ? parseInt(body.mileage.replace(/[ mi,]/g, '')) 
      : body.mileage;
    result.mileage = isNaN(rawMileage) ? 0 : rawMileage;
  }
  
  if (body.bodyType !== undefined) result.body_type = body.bodyType;
  if (body.color !== undefined) result.color = body.color;
  if (body.location !== undefined) result.location = body.location;
  if (body.status !== undefined) result.status = body.status;
  if (body.specs !== undefined) result.specs = body.specs;
  if (body.conditionNotes !== undefined) result.condition_notes = body.conditionNotes;
  if (body.thumbnailImage !== undefined) result.thumbnail_image = body.thumbnailImage;
  if (body.images !== undefined) result.images = body.images;
  
  return result;
};

// @desc    Get All Vehicles (filterable)
// @route   GET /api/vehicles
// @access  Public
export const getVehicles = async (req, res, next) => {
  try {
    let query = supabase.from('vehicles').select('*');

    // Filter by status if query parameter is set (e.g. ?status=available)
    if (req.query.status) {
      query = query.eq('status', req.query.status);
    }

    const { data, error } = await query.order('id', { ascending: false });

    if (error) {
      return next(new ErrorResponse(error.message, 500));
    }

    const camelCaseVehicles = data.map(mapToCamelCase);

    res.status(200).json({
      success: true,
      count: camelCaseVehicles.length,
      data: camelCaseVehicles
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get Single Vehicle
// @route   GET /api/vehicles/:id
// @access  Public
export const getVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      return next(new ErrorResponse(error.message, 500));
    }

    if (!data) {
      return next(new ErrorResponse(`Vehicle not found with ID ${id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: mapToCamelCase(data)
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Vehicle
// @route   POST /api/vehicles
// @access  Private (Agent/Admin)
export const createVehicle = async (req, res, next) => {
  try {
    const snakeData = mapToSnakeCase(req.body);

    const { data, error } = await supabase
      .from('vehicles')
      .insert([snakeData])
      .select()
      .single();

    if (error) {
      return next(new ErrorResponse(error.message, 400));
    }

    res.status(201).json({
      success: true,
      data: mapToCamelCase(data)
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Vehicle
// @route   PUT /api/vehicles/:id
// @access  Private (Agent/Admin)
export const updateVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snakeData = mapToSnakeCase(req.body);

    const { data, error } = await supabase
      .from('vehicles')
      .update(snakeData)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      return next(new ErrorResponse(error.message, 400));
    }

    if (!data) {
      return next(new ErrorResponse(`Vehicle not found with ID ${id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: mapToCamelCase(data)
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private (Admin only)
export const deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      return next(new ErrorResponse(error.message, 500));
    }

    if (!data) {
      return next(new ErrorResponse(`Vehicle not found with ID ${id}`, 404));
    }

    res.status(200).json({
      success: true,
      message: `Vehicle ${id} successfully deleted.`
    });
  } catch (err) {
    next(err);
  }
};
