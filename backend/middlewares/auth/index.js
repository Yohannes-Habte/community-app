import JWT from "jsonwebtoken";
import createError from "http-errors";
import mongoose from 'mongoose';
import Member from "../../models/member/index.js";

//====================================================================
// Verify token
//====================================================================

const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

//====================================================================
// Middleware to check if user is authenticated
//====================================================================

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createError(401, 'User is not authenticated!'));
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return next(createError(403, 'Forbidden'));
  }
};

//====================================================================
// Is user or admin
//====================================================================

export const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    const decoded = verifyToken(token);
    const loggedInUserId = decoded.id;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await Member.findById(loggedInUserId).select("_id role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user._id.toString() !== req.params.id && user.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to perform this action",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

//====================================================================
// Is admin auth
//====================================================================
export const isAdminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(createError(401, "Not Authenticated"));
    }

    let decodedToken;
    try {
      decodedToken = verifyToken(token);
    } catch (error) {
      return next(createError(403, "Forbidden: You do not have permission!"));
    }

    const user = await Member.findById(decodedToken.id);

    if (user && user.role === "admin") {
      req.user = user; // Store the user info in req.user for further use
      next();
    } else {
      return next(createError(403, "Unauthorized!"));
    }
  } catch (error) {
    return next(createError(500, "Server error!"));
  }
};

//====================================================================
// Is priest auth
//====================================================================
export const isPriestAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(
        createError(401, "Priest is not authenticated. Please login!")
      );
    }

    let decodedToken;
    try {
      decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next(createError(403, "Forbidden: You do not have permission!"));
    }

    const user = await Member.findById(decodedToken.id);

    if (user && user.role === "priest") {
      req.user = user; // Store the user info in req.user for further use
      next();
    } else {
      return next(createError(403, "User is not authorized as a priest."));
    }
  } catch (error) {
    return next(createError(500, "Server error!"));
  }
};

//====================================================================
// Is Financial Manager auth
//====================================================================

export const isFinanceManagerAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(
        createError(401, "Finance Manager is not authenticated. Please login!")
      );
    }

    let decodedToken;
    try {
      decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return next(createError(403, "Forbidden: You do not have permission!"));
    }

    const user = await Member.findById(decodedToken.id);

    if (user && user.role === "financeManager") {
      req.user = user; // Store the user info in req.user for further use
      next();
    } else {
      return next(
        createError(403, "User is not authorized as a Finance Manager.")
      );
    }
  } catch (error) {
    return next(createError(500, "Server error!"));
  }
};


