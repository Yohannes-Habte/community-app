import createError from 'http-errors';
import Sacrament from '../models/sacramentModel.js';

//==========================================================================
// Create New Sacrament
//==========================================================================
export const createSacrament = async (req, res, next) => {
  const newSacrament = new Sacrament(req.body);
  try {
    const saveSacrament = await newSacrament.save();
    return res.status(200).json(saveSacrament);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'New sacrament could not be created! Please try again')
    );
  }
};

//==========================================================================
// Update Sacrament
//==========================================================================
export const updateSacrament = async (req, res, next) => {
  try {
    const sacrament = await Sacrament.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(sacrament);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The sacrament could not be updated! Please try again')
    );
  }
};

//==========================================================================
// Get Sacrament
//==========================================================================
export const getSacrament = async (req, res, next) => {
  try {
    const sacrament = await Sacrament.findById(req.params.id);
    return res.status(200).json(sacrament);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The sacrament could not be accessed! Please try again')
    );
  }
};

//==========================================================================
// Delete Sacrament
//==========================================================================
export const deleteSacrament = async (req, res, next) => {
  try {
    const sacrament = await Sacrament.findById(req.params.id);
    await Sacrament.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(`${sacrament.name} has been successfully deleted.`);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The sacrament could not be deleted! Please try again')
    );
  }
};

//==========================================================================
// Get all sacraments
//==========================================================================
export const getAllSacraments = async (req, res, next) => {
  try {
    const sacraments = await Sacrament.find();
    return res.status(200).json(sacraments);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The sacraments could not be accessed! Please try again')
    );
  }
};

//==========================================================================
// Count all sacraments
//==========================================================================
export const countSacraments = async (req, res, next) => {
  try {
    const counts = await Sacrament.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The sacraments count could not be accessed! Please try again'
      )
    );
  }
};
