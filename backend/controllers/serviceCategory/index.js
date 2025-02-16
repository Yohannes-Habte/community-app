import Category from "../../models/serviceCategory/index.js";
import createError from "http-errors";
import mongoose from "mongoose";
import Service from "../../models/service/index.js";

//==========================================================================
// Create New service category
//==========================================================================
export const createCategory = async (req, res, next) => {
  const { category } = req.body;
  try {
    const serviceCategory = await Category.findOne({ category: category });

    if (serviceCategory) {
      return next(createError(400, "Service category already exist!"));
    }

    const newCategory = new Category(req.body);

    try {
      await newCategory.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Service category not saved"));
    }

    res.status(201).json({
      success: true,
      message: "Service category successfully created!",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! please try again!"));
  }
};

//==========================================================================
// Get all categories
//==========================================================================
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return next(createError(404, "Categories not found!"));
    }

    return res.status(200).json({
      success: true,
      result: categories,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Get single service category
//==========================================================================
export const getCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return next(createError(400, "Service category does not exist!"));
    }

    return res.status(200).json({
      success: true,
      result: category,
    });
  } catch (error) {
    return next(createError(400, "Server error! Please try again!"));
  }
};

//==========================================================================
// Delete single service category
//==========================================================================
export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  // Validate the category ID
  if (!mongoose.isValidObjectId(categoryId)) {
    return next(createError(400, "Invalid category ID provided."));
  }

  // Start a session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the category with the session
    const category = await Category.findById(categoryId).session(session);

    if (!category) {
      await session.abortTransaction();
      return next(createError(404, "Service category not found."));
    }

    // Delete related Service documents with the session
    await Service.deleteMany({ serviceCategory: categoryId }).session(session);

    // Delete the category with the session
    await Category.findByIdAndDelete(categoryId).session(session);

    // Commit the transaction
    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message:
        "Service category and related services have been successfully deleted.",
    });
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    return next(createError(500, `Server error: ${error.message}`));
  } finally {
    // Always ensure the session is closed
    session.endSession();
  }
};

//==========================================================================
// Count all categories
//==========================================================================

export const countCategories = async (req, res, next) => {
  try {
    // Use the 'lean' option for optimized query if no modifications to the documents are needed
    const totalCategories = await Category.countDocuments().lean();

    // Ensure the response is structured and sanitized properly
    return res.status(200).json({
      success: true,
      result: totalCategories,
    });
  } catch (error) {
    console.error(`Error counting categories: ${error.message}`);

    // Pass a more generic error message to the client for security purposes
    next(createError(500, "Server error occurred while counting categories."));
  }
};
