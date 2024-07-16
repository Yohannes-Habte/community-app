import createError from "http-errors";
import Member from "../../models/member/index.js";
import Service from "../../models/service/index.js";
import mongoose from "mongoose";

//==========================================================================
// Create New Prayer Request
//==========================================================================
export const createServiceRequest = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.userId);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    const newServiceRequest = new Service(req.body);

    user.services = [...user.services, newServiceRequest];

    // Save new service request to the user who has ordered it
    try {
      await user.save();
    } catch (error) {
      return next(createError(400, "Service request is added to user!"));
    }

    // Save new prayer request
    try {
      await newServiceRequest.save();
    } catch (error) {
      return next(createError(400, "Sacrament request is not saved!"));
    }

    return res.status(201).json({
      success: true,
      prayer: newServiceRequest,
      message: "Service request is successfully completed!",
    });
  } catch (error) {
    return next(createError(500, "Server error"));
  }
};

//==========================================================================
// Get Single Prayer request
//==========================================================================

export const getSingleService = async (req, res, next) => {
  try {
    const prayer = await Service.findById(req.params.id);

    if (!prayer) {
      return next(createError(400, "Service does not found!"));
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

export const getAllServices = async (req, res, next) => {
  // Extract serviceName from query parameters
  const serviceName = req.query.serviceName;

  try {
    let services;

    if (serviceName) {
      // Query services based on serviceName
      services = await Service.find({ serviceName });
    } else {
      // Fetch all services if no serviceName provided
      services = await Service.find();
    }

    if (services.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Services not found!",
      });
    }

    return res.status(200).json({
      success: true,
      result: services,
    });
  } catch (error) {
    next(createError(500, "Server error!"));
  }
};

//====================================================================
// Total Number of prayer requests by parishioners
//====================================================================
export const totalNumberOfServices = async (req, res, next) => {
  try {
    const servicesCount = await Service.countDocuments();

    if (!servicesCount) {
      return next(createError(400, "<Service not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      counts: servicesCount,
    });
  } catch (error) {
    next(createError(500, "Database could not be queried. Please try again"));
  }
};

//==========================================================================
// Delete Service if the serviceId is available in more than one user
//==========================================================================

export const deleteService = async (req, res) => {
  const serviceId = req.params.serviceId;

  // Validate the input
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  // Authorization check
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Forbidden: to perform service deletion" });
  }

  // Start a session for transaction
  // Mongoose Sessions (Database Transactions): These are used to ensure that a series of database operations are executed atomically. If all operations within the transaction succeed, the changes are committed. If any operation fails, the entire transaction is rolled back.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find and delete the service from the Service collection
    const service = await Service.findByIdAndDelete(serviceId).session(session);

    if (!service) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Service not found" });
    }

    // Remove the reference to the deleted service from all members
    await Member.updateMany(
      { "services._id": serviceId },
      { $pull: { services: { _id: serviceId } } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();

    // Log the error for debugging purposes
    console.error("Error deleting service:", err);

    return res.status(500).json({ message: "Internal server error" });
  }
};

//==========================================================================
// Delete Service if the serviceId is unique and available only in one user
//==========================================================================

// Function to delete a service by ID
export const deleteOneService = async (req, res) => {
  const serviceId = req.params.serviceId;

  // Validate the input
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  // Authorization check
  if (req.user.role !== "priest") {
    return res.status(403).json({ message: "Forbidden: to delete services" });
  }

  // Start a session for transaction
  // Mongoose Sessions (Database Transactions): These are used to ensure that a series of database operations are executed atomically. If all operations within the transaction succeed, the changes are committed. If any operation fails, the entire transaction is rolled back.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find and delete the service from the Service collection
    const service = await Service.findByIdAndDelete(serviceId).session(session);

    if (!service) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Service not found" });
    }

    // Remove the reference to the deleted service from the respective member
    const member = await Member.findOneAndUpdate(
      { "services._id": serviceId },
      { $pull: { services: { _id: serviceId } } },
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

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();

    // Log the error for debugging purposes
    console.error("Error deleting service:", err);

    return res.status(500).json({ message: "Internal server error" });
  }
};
