import mongoose from "mongoose";

const { Schema } = mongoose;

// Mass Schema
const massSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true, // Index for efficient querying
    },

    time: { type: String, required: true },

    type: {
      type: String,
      enum: [
        "Daily",
        "Saturday",
        "Sunday",
        "Holy Day",
        "Feast Day",
        "Special Occasion",
      ],
      default: "Saturday",
      required: true,
    },

    officiant: { type: String, required: true },

    participants: { type: Number, min: 30, default: 100 },

    confession: { type: String, required: true },

    preMassPrayer: { type: String, required: true },

    massStatus: {
      type: String,
      enum: ["upcoming", "past"],
      default: "upcoming",
    },

    readings: {
      firstReading: { type: String },
      psalm: { type: String },
      secondReading: { type: String },
      gospel: { type: String },
    },

    location: {
      name: { type: String, required: true },
      address: { type: String, trim: true },
      coordinates: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },

    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    description: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

massSchema.index({ massStatus: 1, date: 1 });

// Mass Model
const Mass = mongoose.model("Mass", massSchema);

// Export Mass Model
export default Mass;
