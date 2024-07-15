import createError from "http-errors";
import Member from "../../models/member/index.js";
import Service from "../../models/service/index.js";

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
// Delete Service
//==========================================================================
export const deleteSingleService = async (req, res, next) => {
  const adminId = req.user.id; // Assuming req.user contains the authenticated admin's details
  const userId = req.params.userId;
  const serviceId = req.params.id;

  // Mongoose Sessions (Database Transactions): These are used to ensure that a series of database operations are executed atomically. If all operations within the transaction succeed, the changes are committed. If any operation fails, the entire transaction is rolled back.

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the admin is actually an admin
    const admin = await Member.findById(adminId).session(session);

    if (!admin || admin.role !== "admin") {
      await session.abortTransaction();
      session.endSession();
      return next(createError(403, "Unauthorized action"));
    }

    // Find the user whose service is to be deleted
    const user = await Member.findById(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, "User not found"));
    }

    // Check if the service exists
    const service = await Service.findById(serviceId).session(session);

    if (!service) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, "Service not found"));
    }

    // Remove the service reference from the user's services array
    await Member.findByIdAndUpdate(
      userId,
      { $pull: { services: { _id: serviceId } } },
      { new: true, session }
    );

    // Delete the service from the Service collection
    await Service.findByIdAndDelete(serviceId, { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Service has been successfully deleted",
    });
  } catch (error) {
    // If any error occurs, abort the transaction and return an error
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return next(createError(500, "Something went wrong!"));
  }
};
