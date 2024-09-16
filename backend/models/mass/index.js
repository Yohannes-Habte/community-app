import mongoose from "mongoose";

const { Schema } = mongoose;

// Mass Schema
const massSchema = new Schema(
  {
    // Date and time of the Mass
    date: {
      type: Date,
      required: true,
      index: true, // Index for efficient querying
    },

    // Time of the Mass
    time: { type: String, required: true },

    // Type of Mass
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

    // Priest or clergy member officiating the Mass
    officiant: { type: String, required: true },

    // Mass participants
    participants: { type: Number, min: 30, default: 100 },

    // Confession prior to Mass
    confession: { type: String, required: true },

    // Prior to Mass prayer
    preMassPrayer: { type: String, required: true },

    // Status of the Mass (e.g., upcoming or past)
    massStatus: {
      type: String,
      enum: ["upcoming", "past"],
      default: "upcoming",
    },

    // Readings associated with the Mass
    readings: {
      firstReading: { type: String },
      psalm: { type: String },
      secondReading: { type: String },
      gospel: { type: String },
    },

    // Location details for the Mass
    location: {
      name: { type: String, required: true },
      address: { type: String, trim: true },
      // Optional latitude and longitude for map integration
      coordinates: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },

    // List of attendees (references to User model)
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Brief description of the Mass
    description: { type: String, trim: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Index for optimized querying on massStatus and date
massSchema.index({ massStatus: 1, date: 1 });

// Mass Model
const Mass = mongoose.model("Mass", massSchema);

// Export Mass Model
export default Mass;
