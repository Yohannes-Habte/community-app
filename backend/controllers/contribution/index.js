import createError from "http-errors";
import Contribution from "../../models/contribution/index.js";
import User from "../../models/member/index.js";
import moment from "moment";
import mongoose from "mongoose";

// =============================================================================
// Create member contribution
// =============================================================================

export const createContribution = async (req, res, next) => {
  const { user, amount, date } = req.body;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(user)) {
    return next(createError(400, "Invalid user ID."));
  }

  try {
    // Find the user by ID
    const foundUser = await User.findById(user);
    if (!foundUser) {
      return next(createError(404, "User not found."));
    }

    // Parse and validate the contribution date
    const contributionDate = new Date(date);
    if (isNaN(contributionDate)) {
      return next(
        createError(400, "Invalid date format. Please use YYYY-MM-DD.")
      );
    }

    // Check for existing contributions in the same month and year
    const startOfMonth = new Date(
      contributionDate.getFullYear(),
      contributionDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      contributionDate.getFullYear(),
      contributionDate.getMonth() + 1,
      0
    );

    const existingContribution = await Contribution.findOne({
      user,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    if (existingContribution) {
      const existingMonth = startOfMonth.toLocaleString("default", {
        month: "long",
      });
      const existingYear = startOfMonth.getFullYear();
      return next(
        createError(
          400,
          `Contribution for ${existingMonth} ${existingYear} already exists.`
        )
      );
    }

    // Create a new contribution instance
    const newContribution = new Contribution({
      user,
      date: contributionDate,
      amount,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    });

    // Save the new contribution document
    await newContribution.save();

    // Add the contribution ID to user's monthlyContributions and save the user
    foundUser.monthlyContributions.push(newContribution);
    await foundUser.save();

    // Respond with the newly created contribution
    return res.status(201).json({
      success: true,
      result: newContribution,
      message: "Contribution created successfully.",
    });
  } catch (error) {
    console.error("Error creating contribution:", error.message);
    next(createError(500, "Server error. Please try again later."));
  }
};

// =============================================================================
// Get all contribution for all members
// =============================================================================

export const getAllContributions = async (req, res, next) => {
  try {
    // Find all contributions and sort by date (year first, then month)
    const contributions = await Contribution.find().sort({ date: 1 });

    if (!contributions) {
      return next(createError(400, "contributions not found!"));
    }
    res.status(200).json({
      success: true,
      result: contributions,
    });
  } catch (error) {
    next(createError(500, "Server error!"));
  }
};

// =============================================================================
// Get all contribution for a single member
// =============================================================================

export const getAllMemberContribution = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch the member by ID and retrieve only their 'monthlyContributions' field
    const member = await User.findById(
      userId,
      "monthlyContributions"
    ).populate({
      path: "monthlyContributions",
      model: "Contribution",
      options: { sort: { date: 1 } },
    });

    if (!member) {
      return next(createError(400, "User not found!"));
    }

    // Sorting contributions by year and month
    const sortedContributions = User.monthlyContributions.sort((a, b) => {
      const dateA = moment(a.date, "YYYY-MM-DD");
      const dateB = moment(b.date, "YYYY-MM-DD");

      // Sorting by year first, and if year is the same or equal, then sort by month
      if (dateA.year() !== dateB.year()) {
        return dateA.year() - dateB.year(); // Sort by year
      } else {
        return dateA.month() - dateB.month(); // If year is equal Sort by month
      }
    });

    res.status(200).json({
      success: true,
      result: sortedContributions,
    });
  } catch (error) {
    next(createError(500, "Server error!"));
  }
};

// =============================================================================
// Delete a single contribution
// =============================================================================

export const deleteContribution = async (req, res, next) => {
  const contributionId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(contributionId)) {
    return res.status(400).json({ message: "Invalid contribution ID" });
  }

  if (req.user.role !== "financeManager") {
    return res
      .status(403)
      .json({ message: "Forbidden: to delete contribution" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the contribution first to access the user reference
    const contribution = await Contribution.findById(contributionId).session(
      session
    );

    if (!contribution) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Contribution not found" });
    }

    // Delete the contribution
    await Contribution.findByIdAndDelete(contributionId).session(session);

    // Update the Member's monthlyContributions array by removing the reference
    const member = await User.findByIdAndUpdate(
      contribution.user,
      { $pull: { monthlyContributions: contributionId } },
      { new: true, session }
    );

    if (!member) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Member not found" });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Contribution deleted successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(createError(500, "Server error!"));
  }
};
