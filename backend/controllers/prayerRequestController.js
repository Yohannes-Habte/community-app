import createError from 'http-errors';
import Prayer from '../models/prayerRequestModel.js';
import Member from '../models/memberModel.js';

//==========================================================================
// Create New Prayer Request
//==========================================================================
export const createPrayerRequest = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.userId);

    if (!user) {
      return next(createError(400, 'User not found! Please login!'));
    }

    const newPrayerRequest = new Prayer(req.body);

    user.services = [...user.services, newPrayerRequest];

    try {
      await user.save();
    } catch (error) {
      return next(createError(400, 'Prayer request is not saved!'));
    }

    return res.status(201).json({
      success: true,
      prayer: user,
      message: 'Prayer request is successfully completed!',
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'Prayer Service request is not created! Please try again'
      )
    );
  }
};
