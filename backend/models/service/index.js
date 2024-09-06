import mongoose from "mongoose";

const { Schema } = mongoose;

// Service Schema
const serviceSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "Member", required: true },
    serviceCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    serviceName: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    identificationDocument: { type: String, required: true },
    message: { type: String, required: true },
    serviceStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    totalMonthlyServices: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

// Service Model
const Service = mongoose.model("Service", serviceSchema);

// Export Service Model
export default Service;
