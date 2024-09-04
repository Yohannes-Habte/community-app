import mongoose from "mongoose";

const { Schema } = mongoose;

// Service Schema
const serviceSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

// Creating index for frequently queried fields
serviceSchema.index({ serviceName: 1 });
serviceSchema.index({ serviceDate: 1 });
serviceSchema.index({ identificationDocument: 1 });

// Service Model
const Service = mongoose.model("Service", serviceSchema);

// Export Service Model
export default Service;
