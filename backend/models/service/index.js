import mongoose from "mongoose";

const { Schema } = mongoose;

// Service Schema
const serviceSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    serviceCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    serviceName: { type: String, required: true },

    serviceDate: { type: Date, required: true },

    // Only required if serviceName is "scriptures"
    scriptureTopic: {
      type: String,
      required: function () {
        return this.serviceName === "scriptures";
      },
    },

    // Only required if serviceName is "catechism"
    catechismTopic: {
      type: String,
      required: function () {
        return this.serviceName === "catechism";
      },
    },

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

// Service Model
const Service = mongoose.model("Service", serviceSchema);

// Export Service Model
export default Service;
