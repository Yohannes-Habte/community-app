import createError from "http-errors";
import Member from "../../models/member/index.js";
import Priest from "../../models/priestDelegation/index.js";

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
