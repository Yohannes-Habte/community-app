import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import Committee from '../../models/committee/index.js';


//==========================================================================
// Register new committee member
//==========================================================================
export const createCommittee = async (req, res, next) => {
  try {
    const committeeAccount = new Committee(req.body);

    // Save new committee account
    try {
      await committeeAccount.save();
    } catch (error) {
      return next(createError(400, 'Committee account is not saved!'));
    }

    return res.status(201).json({
      success: true,
      committee: committeeAccount,
      message: 'Account is successfully created.',
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'Database has problem to create an account for a committee member! please try again!'
      )
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
export const updateCommitteeMember = async (req, res, next) => {
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
