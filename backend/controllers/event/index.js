import Event from "../../models/event/index.js";
import Member from "../../models/member/index.js";
import createError from "http-errors";


// =============================================================================
// Create member contribution
// =============================================================================

export const createEvent = async (req, res, next) => {
  try {
    const admin = await Member.find({ role: "admin" });

    if (!admin) {
      return next(createError(400, `Admin not fount! Please login`));
    }

    const newEvent = new Event(req.body);

    // Save new event
    try {
      await newEvent.save();
    } catch (error) {
      return next(createError(400, "New Event is not saved!"));
    }

    return res.status(201).json({
      success: true,
      event: newEvent,
      message: "New event is successfully created.",
    });
  } catch (error) {
    next(createError(500, "Event could not be posted! Please try again!"));
  }
};
