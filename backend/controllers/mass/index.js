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
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Create start and end date for the current year
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);

    // Fetch masses that fall within the current year
    const masses = await Mass.find({
      date: { $gte: startOfYear, $lte: endOfYear },
    }).sort({ date: 1 }); // Sort by date in ascending order

    if (!masses || masses.length === 0) {
      return next(createError(404, "No Masses found for the current year"));
    }

    // Send the response
    res.status(200).json({ success: true, result: masses });
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
  try {
    const { id } = req.params;
    const mass = await Mass.findById(id).populate("attendees"); // Populate attendees with User details

    if (!mass) {
      return res.status(404).json({ message: "Mass not found" });
    }

    res.status(200).json(mass);
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
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Update the Mass document
    const updatedMass = await Mass.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedMass) {
      return res.status(404).json({ message: "Mass not found" });
    }

    res
      .status(200)
      .json({ message: "Mass updated successfully", mass: updatedMass });
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
