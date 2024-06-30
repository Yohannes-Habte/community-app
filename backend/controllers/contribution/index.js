import createError from "http-errors";
import Contribution from "../../models/contribution/index.js";
import Member from "../../models/member/index.js";

// =============================================================================
// Create member contribution
// =============================================================================

export const createContribution = async (req, res, next) => {
  try {
    // const user = await User.findById(req.user._id);
    const user = await Member.findById(req.params.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const newContribution = new Contribution(req.body);

    // Save new contribution
    try {
      await newContribution.save();
    } catch (error) {
      console.log(error);
      return next(createError(400, "Contribution is not saved!"));
    }

    // Check if there is the same monthly contribution in the database
    const sameContribution = user.monthlyContributions.find(
      (contribution) => contribution._id.toString() === newContribution._id
    );

    if (sameContribution) {
      return next(createError(400, `Contribution already exist!`));
    }

    // Add new contribution to the monthly contribution array
    user.monthlyContributions.push(newContribution._id);

    // Save user update
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return next(createError(400, "Contribution is not saved!"));
    }

    return res.status(201).json({
      success: true,
      contribution: newContribution,
      message: "The contribution is successful.",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Server error!"));
  }
};
