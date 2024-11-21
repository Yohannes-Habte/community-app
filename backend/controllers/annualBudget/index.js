import mongoose from "mongoose";
import Budget from "../../models/annualBudget/index.js";
import createError from "http-errors";

// Function to create an annual budget
export const createAnnualBudget = async (req, res, next) => {
  const { year, plannedBudget, budgetStatus, remarks } = req.body;

  try {
    if (!plannedBudget || plannedBudget.length === 0) {
      throw createError(400, "The planned budget cannot be empty.");
    }

    const existingBudget = await Budget.findOne({ year });

    if (existingBudget) {
      return next(createError(400, "Budget for this year already exists"));
    }

    const newBudget = new Budget({
      year,
      plannedBudget,
      budgetStatus,
      remarks,
    });

    await newBudget.save();

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      result: newBudget,
    });
  } catch (error) {
    console.log("Error =", error);
    next(createError(500, "Error creating budget"));
  }
};

// Function to get all annual budgets
export const getAnnualBudgets = async (req, res, next) => {
  try {
    const budgets = await Budget.find();

    if (!budgets) {
      return next(createError(404, "Budgets not found"));
    }

    res.status(200).json({
      success: true,
      message: "Budgets fetched successfully",
      result: budgets,
    });
  } catch (error) {
    console.log("Error =", error);
    next(createError(500, "Error fetching budgets"));
  }
};

// Function to get a single annual budget
export const getSingleAnnualBudget = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid budget ID"));
  }

  try {
    const budget = await Budget.findById(id);

    if (!budget) {
      return next(createError(404, "Budget not found"));
    }

    res.status(200).json({
      success: true,
      message: "Budget fetched successfully",
      result: budget,
    });
  } catch (error) {
    console.log("Error =", error);
    next(createError(500, "Error fetching budget"));
  }
};

// Function to update an annual budget
export const updateAnnualBudget = async (req, res, next) => {
  const { id } = req.params;
  const { budgetStatus, remarks } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid budget ID"));
  }

  try {
    const budget = await Budget.findById(id);

    if (!budget) {
      return next(createError(404, "Budget not found"));
    }

    await Budget.findByIdAndUpdate(
      id,
      { $set: { budgetStatus, remarks } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      result: budget,
    });
  } catch (error) {
    console.log("Error =", error);
    next(createError(500, "Error updating budget"));
  }
};

// Function to delete an annual budget
export const deleteAnnualBudget = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "Invalid budget ID"));
  }
  try {
    const budget = await Budget.findByIdAndDelete(id);

    if (!budget) {
      return next(createError(404, "Budget not found."));
    }

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    console.log("Error =", error);
    next(createError(500, "Error deleting budget"));
  }
};
