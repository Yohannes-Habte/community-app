import mongoose from "mongoose";
import Event from "../../models/event/index.js";
import Member from "../../models/member/index.js";
import createError from "http-errors";

// =============================================================================
// Create An Event
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
      console.log("Save =", error);
      return next(createError(400, "New Event is not saved!"));
    }

    return res.status(201).json({
      success: true,
      message: "New event is successfully created.",
    });
  } catch (error) {
    console.log(error);
    next(createError(500, "Event could not be posted! Please try again!"));
  }
};

// =============================================================================
// Get a single event
// =============================================================================

export const getEvent = async (req, res, next) => {
  const eventId = req.params.id;

  if (!mongoose.isValidObjectId(eventId)) {
    return next(createError(400, "Invalid event ID!"));
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return next(createError(400, `Event not found!`));
    }

    return res.status(201).json({
      success: true,
      result: event,
    });
  } catch (error) {
    next(createError(500, "Server error! Please try again!"));
  }
};

// =============================================================================
// Update an event
// =============================================================================
export const updateEvent = async (req, res, next) => {
  const eventId = req.params.id;

  const {
    eventName,
    eventPurpose,
    eventOrganizer,
    eventFacilitator,
    eventAddress,
    eventDate,
  } = req.body;

  // validate the event id
  if (!mongoose.isValidObjectId(eventId)) {
    return next(createError(400, "Invalid event ID!"));
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return next(createError(400, `Event not found!`));
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $set: {
          eventName,
          eventPurpose,
          eventOrganizer,
          eventFacilitator,
          eventAddress,
          eventDate,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent) {
      return next(createError(400, `Event could not be updated!`));
    }

    return res.status(201).json({
      success: true,
      message: "Event is successfully updated.",
    });
  } catch (error) {
    next(createError(500, "Server error! Please try again!"));
  }
};

// =============================================================================
// Get all events
// =============================================================================

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });

    if (!events) {
      return next(createError(400, `Events not found!`));
    }

    return res.status(201).json({
      success: true,
      result: events,
    });
  } catch (error) {
    next(createError(500, "Server Error!"));
  }
};

// =============================================================================
// Get the last event
// =============================================================================
export const getLastEvent = async (req, res) => {
  try {
    // Fetch the last created event based on the 'createdAt' field
    const lastEvent = await Event.findOne().sort({ createdAt: -1 });
    if (lastEvent) {
      res.status(200).json({ success: true, result: lastEvent });
    } else {
      res.status(404).json({ message: "No events found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =============================================================================
// Delete an event
// =============================================================================

export const deleteEvent = async (req, res, next) => {
  const eventId = req.params.id;

  if (!mongoose.isValidObjectId(eventId)) {
    return next(createError(400, "Invalid event ID!"));
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return next(createError(400, `Event not found!`));
    }

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      success: true,
      message: "Event is successfully deleted.",
    });
  } catch (error) {
    next(createError(500, "Server error! Please try again!"));
  }
};
