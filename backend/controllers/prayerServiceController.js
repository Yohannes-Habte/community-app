import createError from 'http-errors';
import Prayer from '../models/prayerServiceModel.js';


//==========================================================================
// Create New Prayer Service
//==========================================================================
export const createPrayerService = async (req, res, next) => {
  const newPrayer = new Prayer(req.body);
  try {
    const savePrayer = await newPrayer.save();
    return res.status(200).json(savePrayer);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'New Prayer Service could not be created! Please try again')
    );
  }
};

//==========================================================================
// Update Prayer Service
//==========================================================================
export const updatePrayerService = async (req, res, next) => {
  try {
    const prayer = await Prayer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(prayer);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The prayer services could not be updated! Please try again')
    );
  }
};

//==========================================================================
// Get Prayer Service
//==========================================================================
export const getPrayerService = async (req, res, next) => {
  try {
    const prayer = await Prayer.findById(req.params.id);
    return res.status(200).json(prayer);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The prayer services could not be accessed! Please try again')
    );
  }
};

//==========================================================================
// Delete Prayer Service
//==========================================================================
export const deletePrayerService = async (req, res, next) => {
  try {
    const prayer = await Prayer.findById(req.params.id);
    await Prayer.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(`${prayer.name} has been successfully deleted.`);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The prayer services could not be deleted! Please try again')
    );
  }
};

//==========================================================================
// Get all Prayer Services
//==========================================================================
export const getAllPrayerService = async (req, res, next) => {
  try {
    const prayer = await Prayer.find();
    return res.status(200).json(prayer);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The prayer services could not be accessed! Please try again')
    );
  }
};

//==========================================================================
// Get all count of Prayer Services
//==========================================================================
export const countPrayerService = async (req, res, next) => {
  try {
    const counts = await Prayer.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The prayer services count could not be accessed! Please try again'
      )
    );
  }
};
