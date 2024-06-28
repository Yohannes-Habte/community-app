import AddressType from "../../models/addressType/index.js";
import createError from "http-errors";


//==========================================================================
// Create new address type
//==========================================================================
export const createAddressType = async (req, res, next) => {
  const { addressType } = req.body;
  try {
    const address = await AddressType.findOne({ addressType: addressType });

    // If user exists in the database
    if (address) {
      return next(
        createError(400, "Address type already exist! try another one!")
      );
    }

    const newAddressType = new AddressType({
      addressType: addressType,
    });

    // Save address type in the database
    try {
      await newAddressType.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Address type could not be saved"));
    }

    res.status(201).json({
      success: true,
      address: newAddressType,
      message: "Address type is successfully created!",
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(500, "Address type could not be created! please try again!")
    );
  }
};

//==========================================================================
// Get all address types
//==========================================================================
export const getAllAddressTypes = async (req, res, next) => {
  try {
    const addressTypes = await AddressType.find();

    // If user exists in the database
    if (!addressTypes) {
      return next(createError(400, "Address types do not exist!"));
    }

    res.status(201).json({
      success: true,
      addresses: addressTypes,
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(500, "Address types could not be accessed! please try again!")
    );
  }
};
