import mongoose, { mongo } from "mongoose";
import Mass from "../../models/mass/index.js";
import createError from "http-errors";

// ================================================================================================
// Controller to create a new Mass
// ================================================================================================
export const createMass = async (req, res) => {
  try {
    const {
      date,
      time,
      type,
      officiant,
      participants,
      confession,
      preMassPrayer,
      massStatus,
      readings,
      location,
      description,
    } = req.body;

    // Extract the month and year from the provided date
    const massDate = new Date(date);
    const month = massDate.getMonth();
    const year = massDate.getFullYear();

    // Check if a Mass already exists for the same month and year
    const existingMass = await Mass.findOne({
      date: {
        $gte: new Date(year, month, 1), // First day of the month
        $lt: new Date(year, month + 1, 1), // First day of the next month
      },
    });

    if (existingMass) {
      return res.status(400).json({
        success: false,
        message: `A Mass for ${massDate.toLocaleString("default", {
          month: "long",
        })} ${year} has already been created.`,
      });
    }

    // Create a new Mass document
    const newMass = new Mass({
      date,
      time,
      type,
      officiant,
      participants,
      confession,
      preMassPrayer,
      massStatus,
      readings,
      location,
      description,
    });

    // Save the Mass document to the database
    await newMass.save();

    res.status(201).json({
      success: true,
      message: "Mass created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Mass",
      error: error.message,
    });
  }
};

// ================================================================================================
// Controller to get a list of all Masses
// ================================================================================================
export const getAllMasses = async (req, res, next) => {
  try {
    // Get the current date and extract month and year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Create start and end dates for the current year
    const startOfCurrentYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    const endOfCurrentYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);

    // Fetch masses for the current year
    const masses = await Mass.find({
      date: { $gte: startOfCurrentYear, $lte: endOfCurrentYear },
    }).sort({ date: 1 });

    if (!masses || masses.length === 0) {
      return next(createError(404, "No Masses found for the current year"));
    }

    // Update `massStatus` for past months dynamically
    const updatedMasses = masses.map((mass) => {
      const massDate = new Date(mass.date);
      if (
        massDate.getFullYear() < currentYear ||
        (massDate.getFullYear() === currentYear &&
          massDate.getMonth() < currentMonth)
      ) {
        mass.massStatus = "completed";
      } else {
        mass.massStatus = "upcoming";
      }
      return mass;
    });

    // Optionally, save changes back to the database (if persistence is needed)

    await Promise.all(
      updatedMasses.map((mass) => {
        return mass.save();
      })
    );

    // Send the response with updated statuses
    res.status(200).json({ success: true, result: updatedMasses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve Masses", error: error.message });
  }
};

// ================================================================================================
// Controller to get a specific Mass by ID
// ================================================================================================
export const getMassById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Mass with that id");

  try {
    const mass = await Mass.findById(id).populate({
      path: "attendees",
      model: "User",
    });

    if (!mass) {
      return res.status(404).json({ message: "Mass not found" });
    }

    res.status(200).json({ success: true, result: mass });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve Mass", error: error.message });
  }
};

// ================================================================================================
// Controller to update a Mass by ID
// ================================================================================================
export const updateMass = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Invalid Mass ID");
  try {
    const updateData = req.body;

    // Update the Mass document
    const updatedMass = await Mass.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedMass) {
      return res.status(404).json({ message: "Mass not found" });
    }

    // Save the updated Mass document
    await updatedMass.save();

    res.status(200).json({
      success: true,
      message: "Mass updated successfully",
      result: updatedMass,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update Mass", error: error.message });
  }
};

// ================================================================================================
// Controller to delete a Mass by ID
// ================================================================================================
export const deleteMass = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the Mass document
    const deletedMass = await Mass.findByIdAndDelete(id);

    if (!deletedMass) {
      return res.status(404).json({ message: "Mass not found" });
    }

    res.status(200).json({ message: "Mass deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Mass", error: error.message });
  }
};

// ================================================================================================
// Controller to get upcoming Masses
// ================================================================================================
export const getUpcomingMasses = async (req, res) => {
  try {
    const masses = await Mass.find({
      date: { $gte: new Date() },
      massStatus: "upcoming",
    }).sort({ date: 1 });
    res.status(200).json(masses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve upcoming Masses",
      error: error.message,
    });
  }
};

// ================================================================================================
// Controller to register a user for a Mass
// ================================================================================================
export const registerForMass = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;

    const mass = await Mass.findById(id);

    if (!mass) {
      return res.status(404).json({ message: "Mass not found" });
    }

    // Check if the user is already registered
    if (mass.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already registered for this Mass" });
    }

    // Check if the Mass has reached its capacity
    if (mass.attendees.length >= mass.capacity) {
      return res
        .status(400)
        .json({ message: "Mass has reached its maximum capacity" });
    }

    // Add the user to the attendees list
    mass.attendees.push(userId);
    await mass.save();

    res
      .status(200)
      .json({ message: "User registered for Mass successfully", mass });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register for Mass", error: error.message });
  }
};
