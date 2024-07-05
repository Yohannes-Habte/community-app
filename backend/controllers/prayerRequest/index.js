import createError from "http-errors";
import Member from "../../models/member/index.js";
import Prayer from "../../models/prayerRequest/index.js";

//==========================================================================
// Create New Prayer Request
//==========================================================================
export const createPrayerRequest = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.userId);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    const newPrayerRequest = new Prayer(req.body);

    user.services = [...user.services, newPrayerRequest];

    // Save new prayer reques to the user who has ordered it
    try {
      await user.save();
    } catch (error) {
      return next(createError(400, "Prayer request is added to user!"));
    }

    // Save new prayer request
    try {
      await newPrayerRequest.save();
    } catch (error) {
      return next(createError(400, "Sacrament request is not saved!"));
    }

    return res.status(201).json({
      success: true,
      prayer: newPrayerRequest,
      message: "Prayer request is successfully completed!",
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        "Prayer Service request is not created! Please try again"
      )
    );
  }
};

//==========================================================================
// Get Single Prayer request
//==========================================================================

export const getSinglePrayer = async (req, res, next) => {
  try {
    const prayer = await Prayer.findById(req.params.id);

    if (!prayer) {
      return next(createError(400, "Proyer does not found!"));
    }

    return res.status(200).json({
      success: true,
      prayer: prayer,
    });
  } catch (error) {
    next(createError(500, "Prayer could not be accessed! Please try again!"));
  }
};

//==========================================================================
// Get all Prayers request
//==========================================================================

export const getAllPrayers = async (req, res, next) => {
  try {
    const prayers = await Prayer.find();

    if (!prayers) {
      return next(createError(400, "Proyers not found!"));
    }

    return res.status(200).json({
      success: true,
      prayers: prayers,
    });
  } catch (error) {
    next(createError(500, "Prayers could not be accessed! Please try again!"));
  }
};

//====================================================================
// Total Number of prayer requests by parishioners
//====================================================================
export const totalNumberOfPrayerRequests = async (req, res, next) => {
  try {
    const prayerCounts = await Prayer.countDocuments();

    if (!prayerCounts) {
      return next(createError(400, "Prayer requests not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      counts: prayerCounts,
    });
  } catch (error) {
    next(createError(500, "Database could not be queried. Please try again"));
  }
};

//==========================================================================
// Delete Prayer Request
//==========================================================================
export const deletePrayerRequest = async (req, res, next) => {
  const userId = req.params.userId;
  const prayerId = req.params.id;
  try {
    const user = await Member.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Update user
    await Member.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $pull: { services: { _id: prayerId } } }
    );

    // Save user after the prayer is added in the database
    try {
      await user.save();
    } catch (error) {
      return next(createError(500, "Something went wrong!"));
    }

    const prayer = await Prayer.findById(prayerId);

    if (!prayer) {
      return next(createError(404, "Spiritual not found"));
    }

    await Prayer.findByIdAndDelete(prayerId);

    return res.status(200).json({
      success: true,
      message: "Prayer has been successfully deleted",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Something went wrong!"));
  }
};
