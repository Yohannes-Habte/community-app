import createError from "http-errors";
import Contribution from "../../models/contribution/index.js";
import Member from "../../models/member/index.js";
import moment from "moment";

// =============================================================================
// Create member contribution
// =============================================================================

export const createContribution = async (req, res, next) => {
  const { user, date, amount } = req.body;
  try {
    // Find the user by ID
    const foundUser = await Member.findById(user);

    if (!foundUser) {
      return next(createError(404, "User not found"));
    }

    // Parse the date from the request body
    const contributionDate = moment(date, "YYYY-MM-DD");

    if (!contributionDate.isValid()) {
      return next(createError(400, "Invalid date format"));
    }

    // Check if the user already has a contribution for the same year and month
    const existingContribution = await Contribution.findOne({
      user: user,
      date: {
        $gte: contributionDate.startOf("month").format("YYYY-MM-DD"), // First day of the month
        $lte: contributionDate.endOf("month").format("YYYY-MM-DD"), // Last day of the month
      },
    });

    if (existingContribution) {
      // Extract month name and year from the contribution date
      const existingMonth = moment(existingContribution.date).format("MMMM");
      const existingYear = moment(existingContribution.date).format("YYYY");

      return next(
        createError(
          400,
          `Contribution for ${existingMonth} ${existingYear} already exists!`
        )
      );
    }

    // Create a new contribution
    const newContribution = new Contribution({
      user: user,
      date: date,
      amount: amount,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    });

    // Save the new contribution
    await newContribution.save();

    // Add the new contribution to the user's monthly contributions array
    foundUser.monthlyContributions.push(newContribution);

    // Save the updated user
    await foundUser.save();

    return res.status(201).json({
      success: true,
      result: newContribution,
      message: "The contribution is successful.",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Server error!"));
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
  const id = req.params.userId;

  try {
    // Fetch the member by ID and retrieve only their 'monthlyContributions' field
    const member = await Member.findById(id, "monthlyContributions");

    if (!member) {
      return next(createError(400, "User not found!"));
    }

    // Sorting contributions by year and month
    const sortedContributions = member.monthlyContributions.sort((a, b) => {
      // Parse the dates assuming 'YYYY-MM-DD' format, or adapt if 'DD-MM-YYYY'
      const dateA = moment(a.date, "YYYY-MM-DD"); // or 'DD-MM-YYYY' if needed
      const dateB = moment(b.date, "YYYY-MM-DD"); // or 'DD-MM-YYYY' if needed

      // Sorting by year first, and if year is the same or equal, then sort by month
      if (dateA.year() !== dateB.year()) {
        return dateA.year() - dateB.year(); // Sort by year
      } else {
        return dateA.month() - dateB.month(); // If year is equal Sort by month
      }
    });

    // Responding with sorted contributions
    res.status(200).json({
      success: true,
      memberContributions: sortedContributions,
    });
  } catch (error) {
    next(createError(500, "Server error!"));
  }
};
