import e from "express";
import mongoose from "mongoose";

const { Schema } = mongoose;

// Event Schema
const eventSchema = new Schema(
  {
    eventName: { type: String, required: true },
    eventPurpose: { type: String, required: true },
    eventOrganizer: { type: String, required: true },
    eventFacilitator: { type: String, required: true },
    eventAddress: { type: String, required: true },
    eventDate: { type: String, required: true, unique: true },
    eventStatus: {
      type: String,
      enum: ["upcoming", "past", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

// Event Model
const Event = mongoose.model("Event", eventSchema);

// Export Event Model
export default Event;
