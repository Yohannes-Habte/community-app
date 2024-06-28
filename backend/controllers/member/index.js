import createError from 'http-errors';
import Member from '../../models/member/index.js';


//====================================================================
// Update user address
//====================================================================
export const updateUserAddress = async (req, res, next) => {
  const { country, state, city, address, zipCode, addressType } = req.body;
  try {
    const userId = req.params.id;
    const user = await Member.findById(userId);

    if (!user) {
      return next(createError(400, 'User not found! Please login!'));
    }

    // Add Address
    const addAddress = {
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
      Object.assign(isAddressExist, addAddress);
    } else {
      // Add new Address to the array
      user.addresses.push(addAddress);
    }

    // Save addres to the user model
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return next(
        createError(400, 'User address is not saved! Please try again!')
      );
    }

    return res.status(200).json({
      success: true,
      address: user,
      message: 'Address is successfully updated!',
    });
  } catch (error) {
    console.log(error);
    next(
      createError(500, 'The address could not be updated! Please try again!')
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
      return next(createError(400, 'User not found! Please login!'));
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
      console.log(error);
      return next(
        createError(400, 'User address is not saved! Please try again!')
      );
    }

    return res.status(200).json({
      success: true,
      address: user,
      message: 'Address is successfully deleted!',
    });
  } catch (error) {
    next(
      createError(500, 'The address could not be deleted! Please try again!')
    );
  }
};

//====================================================================
// Get single user
//====================================================================
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.id);

    if (!user) {
      return next(createError(400, 'User not found! Please login!'));
    }

    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(createError(500, 'User could not be deleted! Please try again!'));
  }
};

//====================================================================
// Get all users
//====================================================================
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Member.find();

    if (!users) {
      return next(createError(400, 'User not found! Please login!'));
    }

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    next(createError(500, 'Users could not be deleted! Please try again!'));
  }
};

//====================================================================
// Total Number of parishioners
//====================================================================
export const totalNumberOfParishioners = async (req, res, next) => {
  try {
    const membersCounts = await Member.countDocuments();
    console.log("count:", membersCounts)

    if (!membersCounts) {
      return next(createError(400, 'Parishioners not found! Please login!'));
    }

    return res.status(200).json({
      success: true,
      counts: membersCounts,
    });
  } catch (error) {
    console.log(error)
    next(createError(500, 'Database could not be queried. Please try again'));
  }
};
