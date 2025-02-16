import createError from "http-errors";
import User from "../../models/member/index.js";
import Service from "../../models/service/index.js";
import mongoose from "mongoose";
import Category from "../../models/serviceCategory/index.js";

//==========================================================================
// Create New Prayer Request
//==========================================================================
export const createServiceRequest = async (req, res, next) => {
  const {
    userId,
    serviceCategory,
    serviceName,
    scriptureTopic,
    catechismTopic,
    serviceDate,
    identificationDocument,
    message,
  } = req.body;

  // Use the `new` keyword to correctly instantiate an ObjectId
  const sanitizedUserId = new mongoose.Types.ObjectId(userId);
  let session;

  try {
    // Start a session for transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // Fetch user by ID and validate existence
    const user = await User.findById(sanitizedUserId).session(session);
    if (!user) {
      throw createError(404, "User not found");
    }

    // Fetch the full service category object
    const serviceGroup = await Category.findById(serviceCategory).session(
      session
    );
    if (!serviceGroup) {
      throw createError(400, "Service category not found");
    }



    // 1. Disallow any new service in "Spiritual Development" category if one already exists (applies globally for all users)
    if (serviceGroup.category === "Spiritual development") {
      const existingServiceInCategory = await Service.findOne({
        serviceCategory,
        serviceName,
        serviceDate,
      }).session(session);

      if (existingServiceInCategory) {
        return next(
          createError(
            400,
            "A service in the 'Spiritual development' category already exists for the selected date."
          )
        );
      }
    }

    // 2. For "Soul Prayer" and "Sacraments", prevent duplicates only for the same user.
    if (
      serviceGroup.category === "Soul prayer" ||
      serviceGroup.category === "Sacraments"
    ) {
      // Check if a service with the same category, name, date, and userId already exists
      const existingServiceForUser = await Service.findOne({
        userId: sanitizedUserId, // Ensure the check is user-specific
        serviceCategory,
        serviceName,
        serviceDate,
      }).session(session);

      if (existingServiceForUser) {
        return next(
          createError(
            400,
            `You have already created a service in the '${serviceGroup.category}' category on this date.`
          )
        );
      }
    }

    // Proceed with creating the service
    const newServiceRequest = new Service({
      userId: sanitizedUserId,
      serviceCategory,
      serviceName,
      scriptureTopic,
      catechismTopic,
      serviceDate,
      identificationDocument,
      message,
    });

    // Append the new service request to the user's services
    user.services.push(newServiceRequest);

    // Save user and service request atomically
    await user.save({ session });
    await newServiceRequest.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Send success response
    return res.status(201).json({
      success: true,
      result: newServiceRequest,
      message: "Service request successfully completed!",
    });
  } catch (error) {
    console.error("Error creating service request:", error);
    // Abort transaction if an error occurs
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    // Handle specific error messages or fallback to a generic message
    return next(error.status ? error : createError(500, "Server error"));
  }
};

//==========================================================================
// Get Single service
//==========================================================================

export const getSingleService = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid Service ID format."));
    }

    // Fetch the service by ID
    const service = await Service.findById(id);

    // Handle if the service was not found
    if (!service) {
      return next(createError(404, "Service not found."));
    }

    // Respond with the service data
    return res.status(200).json({
      success: true,
      result: service,
    });
  } catch (error) {
    // Handle potential database errors or other exceptions
    return next(
      createError(500, "Internal server error. Please try again later.")
    );
  }
};

//==========================================================================
// Update service request
//==========================================================================

export const updateServiceRequest = async (req, res, next) => {
  const serviceId = req.params.id;
  const { serviceStatus, serviceDate, message } = req.body;

  // Validate the service ID format
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return next(createError(400, "Invalid Service ID format."));
  }

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Find and update the Service document by ID
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { serviceStatus, serviceDate, message },
      { new: true, session }
    );

    if (!service) {
      throw createError(404, "Service not found.");
    }

    // Step 2: Check if the service is linked to the Member's services array
    const member = await User.findOne({
      _id: service.userId,
      services: serviceId,
    }).session(session);

    if (!member) {
      throw createError(404, "Member with the specified service not found.");
    }

    // Step 3: Commit the transaction if both updates succeed
    await session.commitTransaction();
    session.endSession();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Service updated successfully within the member's record.",
      service,
    });
  } catch (error) {
    // If there's an error, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error updating service:", error);
    return next(
      createError(500, "Internal server error. Please try again later.")
    );
  }
};

//==========================================================================
// Get all services
//==========================================================================

export const getAllServices = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user.role !== "priest") {
      return next(
        createError(
          403,
          "Forbidden: You do not have permission to view services"
        )
      );
    }

    // Fetch services, populate the 'serviceCategory' field, and sort by serviceDate (year and month)
    const services = await Service.find().populate("serviceCategory").sort({
      serviceDate: 1, // Sort by serviceDate in ascending order (first year, then month)
    });

    if (!services || services.length === 0) {
      return next(createError(404, "No services found."));
    }

    return res.status(200).json({
      success: true,
      result: services,
    });
  } catch (error) {
    return next(createError(500, "Server error. Please try again later."));
  }
};

//==========================================================================
// Get all services
//==========================================================================

export const allServices = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    if (user.role !== "admin") {
      return next(
        createError(
          403,
          "Forbidden: You do not have permission to view services"
        )
      );
    }

    // Fetch services, populate the 'serviceCategory' field, and sort by serviceDate (year and month)
    const services = await Service.find().populate("serviceCategory").sort({
      serviceDate: 1, // Sort by serviceDate in ascending order (first year, then month)
    });

    // Check if services are found
    if (!services || services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found.",
      });
    }

    // Return the fetched services
    return res.status(200).json({
      success: true,
      result: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error); // Log error for internal tracking
    return next(createError(500, "Server error. Please try again later."));
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
  if (req.user.role !== "priest") {
    return res
      .status(403)
      .json({ message: "Forbidden: to perform service deletion" });
  }

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
    await User.updateMany(
      { services: serviceId },
      { $pull: { services: serviceId } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
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

export const deleteOneService = async (req, res) => {
  const serviceId = req.params.serviceId;


  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  // Authorization check
  if (req.user.role !== "priest") {
    return res.status(403).json({ message: "Forbidden: to delete services" });
  }

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
    const member = await User.findOneAndUpdate(
      { services: serviceId },
      { $pull: { services: serviceId } },
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

    return res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
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
// Get three popular categories with the most services details
//==========================================================================

export const getPopularCategories = async (req, res) => {
  try {
    const popularCategories = await Service.aggregate([
      {
        $match: {
          serviceStatus: "completed", // Filter to include only completed services
        },
      },

      {
        $group: {
          _id: "$serviceName", // Group by service name
          count: { $sum: 1 }, // Count occurrences of each service
          details: { $last: "$$ROOT" }, // Capture full service details (first match in group)
        },
      },

      { $sort: { count: -1 } }, // Sort by count in descending order

      { $limit: 4 }, // Limit to top 3

      {
        $project: {
          _id: 0, // Exclude the default _id field
          serviceName: "$_id", // Rename _id to serviceName
          count: 1, // Keep the count field
          details: 1, // Keep the full details of the service
        },
      },
    ]);

    res.status(200).json({ success: true, result: popularCategories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
