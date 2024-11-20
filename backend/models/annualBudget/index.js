import mongoose from "mongoose";
import createError from "http-errors";

const { Schema } = mongoose;

// Define the Annual Budget Schema
const annualBudgetSchema = new Schema(
  {
    year: { type: Number, required: true, unique: true },
    plannedBudget: [
      {
        referenceNumber: { type: Number, required: true, unique: true },
        itemName: { type: String, required: true },
        unitCost: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalCost: { type: Number, default: 0 }, // Will be auto-calculated
        description: { type: String, required: true },
      },
    ],
    budgetStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
      required: true,
    },
    totalAnnualBudget: { type: Number, default: 0 }, // Will be auto-calculated
    remarks: { type: String },
    diocesesConfirmation: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false, // Disable the `__v` versioning field
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to objects
  }
);

// Middleware to auto-calculate `totalCost` for each plannedBudget item
annualBudgetSchema.pre("save", function (next) {
  this.plannedBudget.forEach((item) => {
    if (!item.unitCost || !item.quantity) {
      throw createError(
        400,
        "Each budget item must have a unit cost and quantity."
      );
    }
    item.totalCost = item.unitCost * item.quantity; // Calculate total cost for each item
  });

  // Auto-calculate `totalAnnualBudget`
  this.totalAnnualBudget = this.plannedBudget.reduce(
    (total, item) => total + item.totalCost,
    0
  );

  next();
});

// Create and export the Budget model
const Budget = mongoose.model("Budget", annualBudgetSchema);
export default Budget;
