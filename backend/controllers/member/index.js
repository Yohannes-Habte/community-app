import createError from "http-errors";
import Member from "../../models/member/index.js";

//====================================================================
// Update user address
//====================================================================
export const updateUserAddress = async (req, res, next) => {
  const { country, state, city, address, zipCode, addressType } = req.body;
  try {
    const userId = req.params.id;
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
    try {
      await user.save();
    } catch (error) {
      return next(
        createError(400, "User address is not saved! Please try again!")
      );
    }

    return res.status(200).json({
      success: true,
      address: user,
      message: "Address is successfully updated!",
    });
  } catch (error) {
    next(
      createError(500, "The address could not be updated! Please try again!")
    );
  }
};

//====================================================================
// Delete user address
//====================================================================
export const deleteUserAddress = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    const user = await Member.findById(userId);

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    // Delete user address using addressId
    await Member.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    // Save updated addres to the user model
    try {
      await user.save();
    } catch (error) {
      return next(
        createError(400, "User address is not saved! Please try again!")
      );
    }

    return res.status(200).json({
      success: true,
      address: user,
      message: "Address is successfully deleted!",
    });
  } catch (error) {
    next(
      createError(500, "The address could not be deleted! Please try again!")
    );
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
const getMembersBySearch = async (search, limit = 5) => {
  try {
    const members = await User.find({
      $or: [
        {
          firstName: { $regex: search, $options: "i" },
          type: { $in: ["what", "ever"] },
        },
        {
          lastName: { $regex: search, $options: "i" },
          type: { $in: ["what", "ever"] },
        },
      ],
    })
      .limit(limit)
      .select("firstName lastName")
      .lean();

    const membersList = members.map((c) => ({
      label: `${c.firstName} ${c.lastName}`,
      value: c._id,
    }));

    return { members };
  } catch (error) {
    return { members: [] };
  }
};

export const getMemberBySearch = async (req, res, next) => {
  try {
    // Get search term from query parameters
    const search = req.query.search || "";

    // Limit
    const limit = parseInt(req.query.limit) || 55;

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
    const membersList = members.map((c) => ({
      label: `${c.firstName} ${c.lastName}`,
      value: c._id,
    }));

    // Send response
    res.json({ members: membersList });
  } catch (error) {
    // Handle error
    next(error);
  }
};

const findUserBySearch = async (req, res, next) => {
  try {
    // Get search term from query parameters
    const search = req.query.search || "";

    // Define the query
    const query = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    };

    // Find one member
    const member = await Member.findOne(query)
      .select("firstName lastName")
      .lean();

    // If no member is found
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Format the member
    const memberData = {
      label: `${member.firstName} ${member.lastName}`,
      value: member._id,
    };

    // Send response
    res.json({ member: memberData });
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
      path: "services._id", // Populate the services array
      model: "Service", // Specify the Service model
      populate: {
        path: "serviceCategory", // Also populate the service category details
        model: "Category", // Specify the Category model
      },
    });

    if (!user) {
      return next(createError(400, "User not found! Please login!"));
    }

    // Map the services to extract the _id (the populated Service document)
    const services = user.services.map((service) => service._id);

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
