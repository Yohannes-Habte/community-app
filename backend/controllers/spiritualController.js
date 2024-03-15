import createError from 'http-errors';
import Spiritual from '../models/spiritualDevelopmentModel.js';
import Member from '../models/memberModel.js';

//==========================================================================
// Create New Spiritual Development
//==========================================================================
export const createSpiritual = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.userId);

    if (!user) {
      return next(createError(400, 'User not found! Please login!'));
    }

    const newSpiritual = new Spiritual(req.body);
    user.services = [...user.services, newSpiritual];

    try {
      await user.save();
    } catch (error) {
      return next(createError(400, 'Spiritual request is not saved!'));
    }

    return res.status(201).json({
      success: true,
      spiritual: user,
      message: 'Spiritual request is successfully completed!',
    });
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



