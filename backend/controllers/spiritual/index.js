import createError from "http-errors";
import Member from "../../models/member/index.js";
import Spiritual from "../../models/spiritual/index.js";

//==========================================================================
// Create New Spiritual Development
//==========================================================================
export const createSpiritual = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.userId);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    const newSpiritual = new Spiritual(req.body);
    user.services = [...user.services, newSpiritual];

    // Save user after adding the new spiritual to the user who has ordered it
    try {
      await user.save();
    } catch (error) {
      return next(createError(400, "The new spiritual is not added to user!"));
    }

    // Save new spiritual
    try {
      await newSpiritual.save();
    } catch (error) {
      console.log(error);
      return next(createError(400, "Spiritual request is not saved!"));
    }

    return res.status(201).json({
      success: true,
      spiritual: newSpiritual,
      message: "Spiritual request is successfully submitted!",
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        "New spiritual development could not be created! Please try again"
      )
    );
  }
};

//==========================================================================
// Get Single Sacrament
//==========================================================================

export const getSingleSpiritual = async (req, res, next) => {
  try {
    const spiritual = await Spiritual.findById(req.params.id);

    if (!spiritual) {
      return next(createError(400, "Spiritual does not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      spiritual: spiritual,
    });
  } catch (error) {
    next(
      createError(500, "Spiritual could not be accessed! Please try again!")
    );
  }
};

//==========================================================================
// Get all Prayers request
//==========================================================================

export const getAllSpirituals = async (req, res, next) => {
  try {
    const { name, date, serviceStatus } = req.query;

    // Create an array to hold filter conditions
    let filters = [];

    if (name) filters.push({ name: { $regex: name, $options: "i" } }); // Case-insensitive regex match
    if (date) filters.push({ date: { $regex: date, $options: "i" } }); // Case-insensitive regex match
    if (serviceStatus)
      filters.push({ serviceStatus: { $regex: serviceStatus, $options: "i" } }); // Case-insensitive regex match

    // Use $and to combine all filters
    const query = filters.length > 0 ? { $and: filters } : {};

    const spirituals = await Spiritual.find(query);

    return res.status(200).json({
      success: true,
      spirituals: spirituals,
    });
  } catch (error) {
    next(
      createError(500, "Spirituals could not be accessed! Please try again!")
    );
  }
};

//====================================================================
// Total Number of spiritual development teachings for parishioners
//====================================================================
export const totalNumberOfSpirituals = async (req, res, next) => {
  try {
    const spiritualsCounts = await Spiritual.countDocuments();

    if (!spiritualsCounts) {
      return next(createError(400, "Spirituals not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      counts: spiritualsCounts,
    });
  } catch (error) {
    next(createError(500, "Database could not be queried. Please try again"));
  }
};
