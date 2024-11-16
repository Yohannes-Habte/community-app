import createError from "http-errors";
import bcrypt from "bcryptjs";
import User from "../../models/member/index.js";
import generateToken from "../../middlewares/token/index.js";
import mongoose from "mongoose";

//==========================================================================
// Create a new member
//==========================================================================
export const registerUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    street,
    zipCode,
    city,
    state,
    country,
    agree,
  } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // If user exists in the database
    if (user) {
      return next(
        createError(400, "Email has been taken. Please try another one!")
      );
    }

    // If user does exist in the database
    if (!user) {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
        street,
        zipCode,
        city,
        state,
        country,
        agree,
      });

      // Save user in the database
      try {
        await newUser.save();
      } catch (error) {
        console.log("error:", error);
        return next(createError(500, "User could not be saved"));
      }

      // Generate token for a user
      const token = generateToken(newUser);

      res
        .cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "strict",
          secure: true,
          // secure: process.env.NODE_ENV === "production", // Cookie is sent only over HTTPS in production
          // sameSite: "Lax", // Helps prevent CSRF attacks
        })
        .status(201)
        .json({
          success: true,
          message: "Account successfully created!",
        });
    }
  } catch (error) {
    console.log("error 2 =", error);
    return next(
      createError(500, "You are unable to create an account! please try again!")
    );
  }
};

//==========================================================================
// Login user
//==========================================================================
export const loginUser = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(400, "Wrong credentials"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(400, "Incorrect password!"));
    }

    if (user && isPasswordValid) {
      const { password, admin, priest, financialManager, ...userDetails } =
        user._doc;

      const token = generateToken(user);

      const tokenExpiry = rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      res

        .cookie("token", token, {
          path: "/",
          httpOnly: false,
          secure: true,
          expires: tokenExpiry,
          sameSite: "strict",
        })
        .status(200)
        .json({
          success: true,
          user: { ...userDetails },
          token,
          message: "User successfully logged in!",
        });
    }
  } catch (error) {
    return next(createError(400, "You are unable to login! Please try again!"));
  }
};

//==========================================================================
// Update user details
//==========================================================================
export const updateUser = async (req, res, next) => {
  const userId = req.user.id;

  if (!mongoose.isValidObjectId(userId)) {
    return next(createError(400, "Invalid user ID!"));
  }

  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      result: updatedUser,
      message: "Account successfully updated!",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Server Error!"));
  }
};

//==========================================================================
// User logout
//==========================================================================

// export const userLogout = async (req, res, next) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
//       sameSite: "strict",
//       sameSite: "none",
//     });
//     res.status(200).json({ success: true, message: "Logged out successfully" });
//   } catch (error) {
//     next(createError(500, "Server error!"));
//   }
// };

//==========================================================================
// User logout
//==========================================================================

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(createError(500, "Server error!"));
  }
};

//==========================================================================
// Change User password
//==========================================================================
export const userChangePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  // validate user ID
  if (!mongoose.isValidObjectId(userId)) {
    return next(createError(400, "Invalid user ID!"));
  }

  try {
    const user = await User.findById(userId);

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
