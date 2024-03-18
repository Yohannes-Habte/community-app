import Member from '../models/memberModel.js';
import Priest from '../models/priestDelegationModel.js';
import createError from 'http-errors';

//==========================================================================
// Delegate Priest
//==========================================================================
export const createPriestDelegation = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.priestId);

    if (!user) {
      return next(createError(400, 'Parish priest not found! Please login!'));
    }

    const newPriestDelegation = new Priest(req.body);

    try {
      await newPriestDelegation.save();
    } catch (error) {
      return next(createError(400, 'Priest delegation is not saved!'));
    }

    user.delegatedPriests.push(newPriestDelegation._id);
    // Save user after delegating a priest
    try {
      await user.save();
    } catch (error) {
      return next(createError(400, 'Priest delegation is not  into the user!'));
    }

    return res.status(201).json({
      success: true,
      delegate: newPriestDelegation,
      message: 'The delegation has been successfully completed!',
    });
  } catch (error) {
    console.log(error);
    next(
      createError(
        500,
        'The delegation of priests is unsuccessful! Please try again'
      )
    );
  }
};
