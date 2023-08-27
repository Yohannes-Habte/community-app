import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import Committee from '../models/committeeModel.js';

//==========================================================================
// Register new committee member
//==========================================================================
export const registerCommitteMember = async (req, res, next) => {
  const {
    fullName,
    email,
    password,
    title,
    phone,
    image,
    year,
    isAdmin,
    isPriest,
  } = req.body;

  try {
    const committeeMember = await Committee.findOne({ email: email });

    // If user exists in the database
    if (committeeMember) {
      return next(
        createError(400, 'Email has been taken. Please try another one!')
      );
    }

    // If user does exist in the database
    if (!committeeMember) {
      const newCommittee = new Committee({
        fullName: fullName,
        email: email,
        password: password,
        title: title,
        phone: phone,
        year: year,
        image: image,
        isAdmin: isAdmin,
        isPriest: isPriest,
      });

      const saveCommittee = await newCommittee.save();

      return res.status(201).json({
        _id: saveCommittee._id,
        fullName: saveCommittee.fullName,
        email: saveCommittee.email,
        password: saveCommittee.password,
        title: saveCommittee.title,
        phone: saveCommittee.phone,
        image: saveCommittee.image,
        year: saveCommittee.year,
        isAdmin: saveCommittee.isAdmin,
        isPriest: saveCommittee.isPriest,
      });
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'You are unable to create an account! please try again!')
    );
  }
};

//==========================================================================
// Login committee member
//==========================================================================
export const loginCommitteeMember = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const committeeMember = await Committee.findOne({ email: email });
    if (!committeeMember) {
      return next(createError(400, 'Email does not exist. Please signup!'));
    }

    // Verfify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, 'Incorrect password!'));
    }

    if (committeeMember && isPasswordValid) {
      // To prevent password and adming sending to the frontend, you can do ....
      const { password, isAdmin, isPriest, ...userDetails } = user._doc;

      return res
        .status(201)
        .json({ details: { ...userDetails }, isAdmin, isPriest });
    }
  } catch (error) {
    console.log(error);
    return next(createError(400, 'You are unable to login! please try again!'));
  }
};

//==========================================================================
// Update committee member details
//==========================================================================
export const updateCommitteeMemberBiodata = async (req, res, next) => {
  try {
    const user = await Committee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json('Update is successful', user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'User is unable to update! please try again!')
    );
  }
};

//==========================================================================
// Get single Committe Member
//==========================================================================
export const getCommitteeMember = async (req, res, next) => {
  try {
    const user = await Committee.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'You ar unable to get the user info! please try again!')
    );
  }
};

//==========================================================================
// Delete a committee member
//==========================================================================
export const deleteCommitteeMember = async (req, res, next) => {
  try {
    const user = await Committee.findById(req.params.id);
    await Committee.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json(`${user.fullName} has been successfully deleted`);
  } catch (error) {
    console.log(error);
    return next(createError(400, 'User is not deleted! please try again!'));
  }
};

//==========================================================================
// Get service facilitator for sacrament
//==========================================================================
export const serviceFacilitator = async (req, res, next) => {
  try {
    const user = await Committee.findById(req.params.id);
    if (user.title === 'Parish Priest') {
      return res.status(200).json(user.fullName);
    } else {
      return res.status(200).json('Facilitator not found!');
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'Priest could not be accessed! please try again!')
    );
  }
};

//==========================================================================
// Get all users
//==========================================================================
export const getAllCommitteeMembers = async (req, res, next) => {
  try {
    const user = await Committee.find();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'Committee members could not be accessed! please try again!'
      )
    );
  }
};
