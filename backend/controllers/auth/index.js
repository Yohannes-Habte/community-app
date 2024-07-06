import createError from "http-errors";
import bcrypt from "bcryptjs";
import Member from "../../models/member/index.js";
import generateToken from "../../middlewares/token/index.js";

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
    city,
    state,
    country,
    isAdmin,
    isPriest,
  } = req.body;

  try {
    const user = await Member.findOne({ email: email });

    // If user exists in the database
    if (user) {
      return next(
        createError(400, "Email has been taken. Please try another one!")
      );
    }

    // If user does exist in the database
    if (!user) {
      const newUser = new Member({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        street: street,
        zipCode: zipCode,
        city: city,
        state: state,
        country: country,
        isAdmin: isAdmin,
        isPriest: isPriest,
        image: image,
      });

      // Save user in the database
      try {
        await newUser.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "User could not be saved"));
      }

      // Generate token for a user
      const userRegistrationToken = generateToken(newUser._id);

      res
        .cookie("user_token", userRegistrationToken, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "none",
          secure: true,
        })
        .status(201)
        .json({
          success: true,
          user: newUser,
          message: "User account is successfully created!",
        });
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(500, "You are unable to create an account! please try again!")
    );
  }
};

//==========================================================================
// Login user
//==========================================================================
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Member.findOne({ email: email });
    if (!user) {
      return next(createError(400, "Email does not exist. Please sign up!"));
    }

    // Verfify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Incorrect password!"));
    }

    if (user && isPasswordValid) {
      // To prevent password and adming sending to the frontend, you can do ....
      const { password, ...userDetails } = user._doc;

      // User token
      const userLoginToken = generateToken(user._id);

      res
        .cookie("user_token", userLoginToken, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({
          success: true,
          user: { ...userDetails },
          message: "User successfully logged in!",
        });
    }
  } catch (error) {
    return next(createError(400, "You are unable to login! please try again!"));
  }
};

//==========================================================================
// Update user details
//==========================================================================
export const updateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    maritalStatus,
    image,
    phone,
    street,
    zipCode,
    city,
    state,
    country,
  } = req.body;
  try {
    const userId = req.params.userId;
    const user = await Member.findById(userId);

    if (!user) {
      createError(400, "User does not exist! please try again!");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.maritalStatus = maritalStatus;
    user.image = image;
    user.phone = phone;
    user.street = street;
    user.zipCode = zipCode;
    user.city = city;
    user.state = state;
    user.country = country;

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return next(
        createError(500, "Update could not be saved! Please try again!")
      );
    }

    return res.status(201).json({
      success: true,
      user: user,
      message: "User account successfully updated!",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "User account is not updated! Please try again!"));
  }
};

//==========================================================================
// User logout
//==========================================================================
export const userLogout = async (req, res, next) => {
  try {
    res.cookie("user_token", null, {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    res
      .status(200)
      .json({ success: true, message: `You have successfully logged out` });
  } catch (error) {
    console.log(error);
    next(createError(500, "User could not logout. Please try again!"));
  }
};

//==========================================================================
// User logout
//==========================================================================
export const userChangePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await Member.findById(req.params.id);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Invalid old password! Please try again!"));
    }

    user.password = newPassword;

    try {
      await user.save();
    } catch (error) {
      return next(
        createError(400, "New password is not saved! Please try again!")
      );
    }

    return res.status(200).json({
      success: true,
      changePassword: user,
      message: "Password is successfully updated!",
    });
  } catch (error) {
    next(createError(500, "User could not logout. Please try again!"));
  }
};
