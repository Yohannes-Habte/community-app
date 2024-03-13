import createError from 'http-errors';
import Member from '../models/memberModel.js';

//==========================================================================
// Get single user
//==========================================================================
export const getUser = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'You ar unable to get the user info! please try again!')
    );
  }
};

//==========================================================================
// Delete a user
//==========================================================================
export const deleteUser = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.id);
    await Member.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json(`${user.firstName} ${user.lastName} has been successfully deleted`);
  } catch (error) {
    console.log(error);
    return next(createError(400, 'User is not deleted! please try again!'));
  }
};

//==========================================================================
// Get all users
//==========================================================================
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await Member.find();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'Users could not be accessed! please try again!')
    );
  }
};

//==========================================================================
// Count all users
//==========================================================================
export const userCount = async (req, res, next) => {
  try {
    const user = await Member.countDocuments();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'Users could not be accessed! please try again!')
    );
  }
};
