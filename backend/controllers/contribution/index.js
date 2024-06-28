import createError from "http-errors";
import Contribution from "../../models/contribution/index.js";

// =============================================================================
// Create member contribution
// =============================================================================

export const createContribution = async (req, res, next) => {
  const { userCode, donation, date } = req.body;
  try {
    const contribution = await Contribution.findOne({ date });

    if (contribution) {
      return next(
        createError(
          400,
          `The payment for ${date} already exists. Continue with the next month!`
        )
      );
    }

    const newContribution = new Contribution({
      userCode: userCode,
      donation: donation,
      date: date,
    });

    // Save new contribution
    try {
      await newContribution.save();
    } catch (error) {
      return next(createError(400, "Contribution is not saved!"));
    }

    return res.status(201).json({
      success: true,
      contribution: newContribution,
      message: "The contribution is successful.",
    });
  } catch (error) {
    next(
      createError(500, "Contribution could not be posted! Please try again!")
    );
  }
};
