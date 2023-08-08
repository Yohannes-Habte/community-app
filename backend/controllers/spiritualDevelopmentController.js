import createError from 'http-errors';
import Spiritual from '../models/spiritualDevelopmentModel.js';

//==========================================================================
// Create New Spiritual Development
//==========================================================================
export const createSpiritual = async (req, res, next) => {
  const newSpiritual = new Spiritual(req.body);
  try {
    const saveSpiritual = await newSpiritual.save();
    return res.status(200).json(saveSpiritual);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'New spiritual development could not be created! Please try again'
      )
    );
  }
};

//==========================================================================
// Update Spiritual Development
//==========================================================================
export const updateSpiritual = async (req, res, next) => {
  try {
    const spiritual = await Spiritual.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(spiritual);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The spiritual development could not be updated! Please try again'
      )
    );
  }
};

//==========================================================================
// Get Spiritual Development
//==========================================================================
export const getSpiritual = async (req, res, next) => {
  try {
    const spiritual = await Spiritual.findById(req.params.id);
    return res.status(200).json(spiritual);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The Spiritual Development could not be accessed! Please try again'
      )
    );
  }
};

//==========================================================================
// Delete Spiritual Development
//==========================================================================
export const deleteSpiritual = async (req, res, next) => {
  try {
    const spiritual = await Spiritual.findById(req.params.id);
    await Spiritual.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(`${spiritual.name} has been successfully deleted.`);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The Spiritual Development could not be deleted! Please try again'
      )
    );
  }
};

//==========================================================================
// Get all Spiritual Development
//==========================================================================
export const getAllSpiritual = async (req, res, next) => {
  try {
    const spirituals = await Spiritual.find();
    return res.status(200).json(spirituals);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The Spiritual Developments could not be accessed! Please try again'
      )
    );
  }
};

//==========================================================================
// Get all Spiritual Development
//==========================================================================
export const countSpiritual = async (req, res, next) => {
  try {
    const counts = await Spiritual.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The Spiritual Development count could not be accessed! Please try again'
      )
    );
  }
};
