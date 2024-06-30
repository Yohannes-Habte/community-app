import createError from "http-errors";
import Member from "../../models/member/index.js";
import Sacrament from "../../models/sacrament/index.js";

//==========================================================================
// Create New Sacrament
//==========================================================================
export const createSacrament = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.userId);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    const newSacrament = new Sacrament(req.body);
    user.services = [...user.services, newSacrament];

    // Save user after adding the new sacrament to the user who has ordered it
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return next(createError(400, "Sacrament request is added to user!"));
    }

    // Save new sacrament
    try {
      await newSacrament.save();
    } catch (error) {
      console.log(error);
      return next(createError(400, "Sacrament request is not saved!"));
    }

    return res.status(201).json({
      success: true,
      sacrament: newSacrament,
      message: "Sacrament request is successfully completed!",
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(400, "New sacrament could not be created! Please try again")
    );
  }
};

//==========================================================================
// Get Single Sacrament
//==========================================================================

export const getSingleSacrament = async (req, res, next) => {
  try {
    const sacrament = await Sacrament.findById(req.params.id);

    if (!sacrament) {
      return next(createError(400, "Sacrament does not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      sacrament: sacrament,
    });
  } catch (error) {
    next(
      createError(500, "Sacrament could not be accessed! Please try again!")
    );
  }
};

//==========================================================================
// Get all Prayers request
//==========================================================================

export const getAllSacraments = async (req, res, next) => {
  try {
    const sacraments = await Sacrament.find();

    if (!sacraments) {
      return next(createError(400, "Sacraments not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      sacraments: sacraments,
    });
  } catch (error) {
    next(
      createError(500, "Sacraments could not be accessed! Please try again!")
    );
  }
};

//====================================================================
// Total Number of sacraments requests by parishioners
//====================================================================
export const totalNumberOfSacraments = async (req, res, next) => {
  try {
    const sacramentsCounts = await Sacrament.countDocuments();

    if (!sacramentsCounts) {
      return next(createError(400, "Sacraments not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      counts: sacramentsCounts,
    });
  } catch (error) {
    next(createError(500, "Database could not be queried. Please try again"));
  }
};

//==========================================================================
// Delete Sacrament
//==========================================================================
export const deleteSacrament = async (req, res, next) => {
  const userId = req.params.userId;
  const sacramentId = req.params.id;
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
      { $pull: { services: { _id: sacramentId } } }
    );

    // Save user after the spiritual is added in the database
    try {
      await user.save();
    } catch (error) {
      return next(createError(500, "Something went wrong!"));
    }

    const sacrament = await Sacrament.findById(sacramentId);

    if (!sacrament) {
      return next(createError(404, "Spiritual not found"));
    }

    await Sacrament.findByIdAndDelete(sacramentId);

    return res.status(200).json({
      success: true,
      message: "Sacrament has been successfully deleted",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Something went wrong!"));
  }
};
