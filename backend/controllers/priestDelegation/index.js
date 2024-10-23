import createError from "http-errors";
import Member from "../../models/member/index.js";
import Priest from "../../models/priestDelegation/index.js";
import mongoose, { mongo } from "mongoose";

//==========================================================================
// Delegate Priest
//==========================================================================
export const createPriestDelegation = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.priestId);

    if (!user) {
      return next(createError(400, "Parish priest not found! Please login!"));
    }

    const newPriestDelegation = new Priest(req.body);

    try {
      await newPriestDelegation.save();
    } catch (error) {
      return next(createError(400, "Priest delegation is not saved!"));
    }

    user.delegatedPriests.push(newPriestDelegation._id);
    // Save user after delegating a priest
    try {
      await user.save();
    } catch (error) {
      return next(createError(400, "Priest delegation is not  into the user!"));
    }

    return res.status(201).json({
      success: true,
      delegate: newPriestDelegation,
      message: "The delegation has been successfully completed!",
    });
  } catch (error) {
    console.log(error);
    next(
      createError(
        500,
        "The delegation of priests is unsuccessful! Please try again"
      )
    );
  }
};

//==========================================================================
// Get all delegated priests
//==========================================================================

export const getAllDelegatedPriests = async (req, res, next) => {
  try {
    const delegatedPriests = await Priest.find().sort({ serviceDate: 1 });

    if (!delegatedPriests) {
      return next(
        createError(400, "Delegated Priest not found! Please login!")
      );
    }

    return res.status(200).json({
      success: true,
      priests: delegatedPriests,
    });
  } catch (error) {
    console.log(error);
    next(
      createError(500, "Spirituals could not be accessed! Please try again!")
    );
  }
};

// ========================================================================
// Get delegated priest by ID
// ========================================================================

export const getDelegatedPriestById = async (req, res, next) => {
  const priestId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(priestId)) {
    return next(createError(400, "Invalid priest ID"));
  }

  try {
    const priest = await Priest.findById(priestId);

    if (!priest) {
      return next(createError(400, "Delegated priest not found!"));
    }

    return res.status(200).json({
      success: true,
      result: priest,
    });
  } catch (error) {
    next(
      createError(
        500,
        "Delegated priest could not be accessed! Please try again!"
      )
    );
  }
};

//==========================================================================
// Update delegated priest
//==========================================================================
export const updateDelegatedPriest = async (req, res, next) => {
  const { priestName, priestEmail, priestPhone, priestAddress } = req.body;

  const priestId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(priestId)) {
    return next(createError(400, "Invalid priest ID"));
  }

  try {
    const priest = await Priest.findById(priestId);

    if (!priest) {
      return next(createError(400, "Delegated priest not found!"));
    }

    const updatePriest = {
      priestName,
      priestEmail,
      priestPhone,
      priestAddress,
    };

    await Priest.findByIdAndUpdate(
      priestId,
      { $set: updatePriest },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Delegated priest has been updated successfully!",
    });
  } catch (error) {
    next(
      createError(
        500,
        "Delegated priest could not be updated! Please try again!"
      )
    );
  }
};

//==========================================================================
// Delete delegated priest
//==========================================================================

export const deleteDelegatedPriest = async (req, res, next) => {
  const priestId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(priestId)) {
    return next(createError(400, "Invalid priest ID"));
  }

  try {
    const priest = await Priest.findById(priestId);

    if (!priest) {
      return next(createError(400, "Delegated priest not found!"));
    }

    await Priest.findByIdAndDelete(priestId);

    return res.status(200).json({
      success: true,
      message: "Delegated priest has been deleted successfully!",
    });
  } catch (error) {
    next(
      createError(
        500,
        "Delegated priest could not be deleted! Please try again!"
      )
    );
  }
};
