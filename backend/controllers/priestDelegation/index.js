import createError from "http-errors";
import Member from "../../models/member/index.js";
import Priest from "../../models/priestDelegation/index.js";
import mongoose from "mongoose";

//==========================================================================
// Delegate Priest
//==========================================================================
export const createPriestDelegation = async (req, res, next) => {
  try {
    const user = await Member.findById(req.user.id);

    if (!user) {
      return next(createError(400, "Parish priest not found! Please login!"));
    }

    if (req.user.role !== "priest") {
      return res.status(403).json({ message: "Forbidden: to delete services" });
    }

    const newPriestDelegation = new Priest(req.body);

    await newPriestDelegation.save();

    user.delegatedPriests.push(newPriestDelegation);

    await user.save();

    return res.status(201).json({
      success: true,
      delegate: newPriestDelegation,
      message: "The delegation has been successfully completed!",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Server error! Please try again"));
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

  // Authorization check
  if (req.user.role !== "priest") {
    return res.status(403).json({ message: "Forbidden: to delete services" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const priest = await Priest.findByIdAndDelete(priestId).session(session);

    if (!priest) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(400, "Delegated priest not found!"));
    }

    const member = await Member.findOneAndUpdate(
      { delegatedPriests: priestId },
      { $pull: { delegatedPriests: priestId } },
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

    return res.status(200).json({
      success: true,
      message: "Delegated priest has been deleted successfully!",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(createError(500, "Server error! Please try again!"));
  }
};
