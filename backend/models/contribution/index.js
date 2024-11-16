import mongoose from "mongoose";

const { Schema } = mongoose;

// Contribution Schema
const contributionSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Contribution Model
const Contribution = mongoose.model("Contribution", contributionSchema);

// Export Contribution Model
export default Contribution;
