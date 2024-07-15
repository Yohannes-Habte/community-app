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
    agree,
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
        agree: agree,
        isAdmin: isAdmin,
        isPriest: isPriest,
      });

      // Save user in the database
      try {
        await newUser.save();
      } catch (error) {
        console.log(error);
        return next(createError(500, "User could not be saved"));
      }

      // Generate token for a user
      const token = generateToken(newUser);

      res
        .cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          sameSite: "none",
          secure: true,
          // secure: process.env.NODE_ENV === "production", // Cookie is sent only over HTTPS in production
          // sameSite: "Lax", // Helps prevent CSRF attacks
        })

        .status(201)
        .json({
          success: true,
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

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Incorrect password!"));
    }

    if (user && isPasswordValid) {
      // Destructure to remove sensitive fields
      const { password, admin, priest, financialManager, ...userDetails } =
        user._doc;

      // User token
      const token = generateToken(user);

      res
        .cookie("token", token, {
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
  const userId = req.params.userId;
  const updateData = req.body;

  try {
    const user = await Member.findById(userId);

    if (!user) {
      createError(400, "User does not exist!");
    }

    const updatedUser = await Member.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Update could not be saved!"));
    }

    return res.status(201).json({
      success: true,
      user: updatedUser,
      message: "Account successfully updated!",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Something went wrong!"));
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
