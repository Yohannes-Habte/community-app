import createError from 'http-errors';
import Sacrament from '../models/sacramentModel.js';
import Member from '../models/memberModel.js';

//==========================================================================
// Create New Sacrament
//==========================================================================
export const createSacrament = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.userId);

    if (!user) {
      return next(createError(400, 'User not found! Please login!'));
    }

    const newSacrament = new Sacrament(req.body);
    user.services = [...user.services, newSacrament];

    // Save user after addingt the new sacrament to the user who has ordered it
    try {
      await user.save();
    } catch (error) {
      return next(createError(400, 'Sacrament request is added to user!'));
    }

    // Save new sacrament
    try {
      await newSacrament.save();
    } catch (error) {
      return next(createError(400, 'Sacrament request is not saved!'));
    }

    return res.status(201).json({
      success: true,
      sacrament: newSacrament,
      message: 'Sacrament request is successfully completed!',
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'New sacrament could not be created! Please try again')
    );
  }
};
