import mongoose from "mongoose";
import createError from "http-errors";

const { Schema } = mongoose;

// Define Finance Schema
const financeSchema = new Schema(
  {
    contribution: { type: Number, required: true },
    offer: { type: Number, required: true },
    servicePayment: { type: Number, required: true },
    frekdasie: { type: Number, required: true },
    choirExpense: { type: Number, required: true },
    eventExpense: { type: Number, required: true },
    priestExpense: { type: Number, required: true },
    guestExpense: { type: Number, required: true },
    presentExpense: { type: Number, required: true },
    tripExpense: { type: Number, required: true },
    otherExpense: { type: Number, required: true },
    date: { type: Date, required: true },
    total: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate total if not explicitly provided
financeSchema.pre("save", function (next) {
  try {
    if (this.total === undefined || this.total === null) {
      // Calculate total as: income (contribution + offer) - expenses
      const totalExpenses =
        this.servicePayment +
        this.frekdasie +
        this.choirExpense +
        this.eventExpense +
        this.priestExpense +
        this.guestExpense +
        this.presentExpense +
        this.tripExpense +
        this.otherExpense;

      this.total = this.contribution + this.offer - totalExpenses;
    }
    next();
  } catch (error) {
    return next(createError(500, error.message));
  }
});

// Finance Model definition
const Finance = mongoose.model("Finance", financeSchema);

// Export the Finance Model
export default Finance;
