import createError from 'http-errors';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

//==========================================================================
// Register new user
//==========================================================================
export const registerUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    image,
    email,
    password,
    phone,
    street,
    zipCode,
    state,
    country,
    isAdmin,
    isPriest,
  } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // If user exists in the database
    if (user) {
      return next(
        createError(400, 'Email has been taken. Please try another one!')
      );
    }

    // If user does exist in the database
    if (!user) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        street: street,
        zipCode: zipCode,
        state: state,
        country: country,
        isAdmin: isAdmin,
        isPriest: isPriest,
        image: image,
      });

      const saveUser = await newUser.save();

      return res.status(201).json({
        _id: saveUser._id,
        firstName: saveUser.firstName,
        lastName: saveUser.lastName,
        email: saveUser.email,
        password: saveUser.password,
        phone: saveUser.phone,
        street: saveUser.street,
        zipCode: saveUser.zipCode,
        state: saveUser.state,
        image: saveUser.image,
        address: saveUser.address,
        country: saveUser.country,
        isAdmin: saveUser.isAdmin,
        isPriest: saveUser.isPriest,
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
// Login user
//==========================================================================
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(400, 'Email does not exist. Please signup!'));
    }

    // Verfify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, 'Incorrect password!'));
    }

    if (user && isPasswordValid) {
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
// Update user details
//==========================================================================
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
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
// Get single user
//==========================================================================
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
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
    const user = await User.findById(req.params.id);
    await User.findByIdAndDelete(req.params.id);
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
    const user = await User.find();
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
    const user = await User.countDocuments();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'Users could not be accessed! please try again!')
    );
  }
};