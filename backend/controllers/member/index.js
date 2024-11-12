import createError from "http-errors";
import Member from "../../models/member/index.js";
import mongoose from "mongoose";

//====================================================================
// Update user address
//====================================================================
export const updateUserAddress = async (req, res, next) => {
  const { country, state, city, address, zipCode, addressType } = req.body;

  const userId = req.user.id;
  // Validate userId
  if (!mongoose.isValidObjectId(userId)) {
    return next(createError(400, "Invalid user ID!"));
  }

  try {
    const user = await Member.findById(userId);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    // Add Address
    const newAddress = {
      country: country,
      state: state,
      city: city,
      address: address,
      zipCode: zipCode,
      addressType: addressType,
    };

    // Check the same address type
    const isSameAddressType = user.addresses.find(
      (address) => address.addressType === addressType
    );

    if (isSameAddressType) {
      return next(createError(400, `${addressType} address already exist!`));
    }

    // Check existence of address in the database
    const isAddressExist = user.addresses.find(
      (address) => address._id === req.body._id
    );

    // If address exist, update the exist address. Otherwise, you need to add new address
    if (isAddressExist) {
      // update the exist address
      Object.assign(isAddressExist, newAddress);
    } else {
      // Add new Address to the array
      user.addresses.push(newAddress);
    }

    // Save address to the user model

    await user.save();

    return res.status(200).json({
      success: true,
      address: user,
      message: "Address is successfully updated!",
    });
  } catch (error) {
    next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Delete user address
//====================================================================
export const deleteUserAddress = async (req, res, next) => {
  const userId = req.user.id;
  const addressId = req.params.id;

  // Validate userId and addressId
  if (
    !mongoose.isValidObjectId(userId) ||
    !mongoose.isValidObjectId(addressId)
  ) {
    return next(createError(400, "Invalid user or address ID!"));
  }

  try {
    // Use $pull to remove the address directly from the addresses array
    const updatedUser = await Member.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!updatedUser) {
      return next(createError(404, "User not found! Please login!"));
    }

    res.status(200).json({
      success: true,
      result: updatedUser,
      message: "Address successfully deleted!",
    });
  } catch (error) {
    console.error("Address deletion error:", error);
    return next(createError(500, "Server error! Please try again!"));
  }
};

//====================================================================
// Get single user
//====================================================================
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await Member.findById(req.user.id).select("-password");
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      result: user,
    });
  } catch (err) {
    next(createError(500, "Server error"));
  }
};

//====================================================================
// Get all users
//====================================================================
export const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users and sort them by firstName in ascending order
    const users = await Member.find().sort({ firstName: 1 });

    if (!users) {
      return next(createError(400, "Users not found! Please login!"));
    }

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    next(createError(500, "Users could not be deleted! Please try again!"));
  }
};

//====================================================================
// Get members by search
//====================================================================

export const getMemberBySearch = async (req, res, next) => {
  try {
    // Get search term from query parameters
    const search = req.query.search || "";

    // Limit
    const limit = parseInt(req.query.limit) || 100;

    // Define the query
    const query = {
      $or: [
        {
          firstName: { $regex: search, $options: "i" },
        },
        {
          lastName: { $regex: search, $options: "i" },
        },
      ],
    };

    // Find members
    const members = await Member.find(query)
      .limit(limit)
      .select("firstName lastName")
      .lean();

    // Format members list
    const membersList = members.map((member) => ({
      label: `${member.firstName} ${member.lastName}`,
      value: member._id,
    }));

    // Send response
    res.json({ success: true, result: membersList });
  } catch (error) {
    // Handle error
    next(error);
  }
};

//==========================================================================
// Get all services of a single user
//==========================================================================
export const getAllUserServices = async (req, res, next) => {
  try {
    const user = await Member.findById(req.user.id).populate({
      path: "services", // Populate the services array
      model: "Service", // Specify the Service model
      populate: {
        path: "serviceCategory", // Also populate the service category details
        model: "Category", // Specify the Category model
      },
    });

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    // Map the services to extract the service (the populated Service document)
    const services = user.services.map((service) => service);

    // Sort the services by serviceDate first by year and then by month
    services.sort((a, b) => {
      const dateA = new Date(a.serviceDate);
      const dateB = new Date(b.serviceDate);

      // Compare by year first
      if (dateA.getFullYear() !== dateB.getFullYear()) {
        return dateA.getFullYear() - dateB.getFullYear();
      }

      // If the years are the same, compare by month
      return dateA.getMonth() - dateB.getMonth();
    });

    return res.status(200).json({
      success: true,
      result: services,
    });
  } catch (error) {
    console.error("Error fetching user services:", error);
    next(createError(500, "Server error!"));
  }
};

//==========================================================================
// Get all members count
//==========================================================================
export const countMembers = async (req, res, next) => {
  try {
    const counts = await Member.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Server error! Please try again"));
  }
};

//==========================================================================
// Delete user account
//==========================================================================

export const deleteUserAccount = async (req, res, next) => {
  const userId = req.params.id;

  if (!mongoose.isValidObjectId(userId)) {
    return next(createError(400, "Invalid user ID!"));
  }

  try {
    const user = await Member.findByIdAndDelete(userId);

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      message: "Account successfully deleted!",
    });
  } catch (error) {
    next(createError(500, "Server Error!"));
  }
};
