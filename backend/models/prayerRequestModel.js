import mongoose from 'mongoose';

const { Schema } = mongoose;

// Prayer Schema
const prayerSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    phone: { type: String, required: true },
    userStatus: { type: String },
  },
  {
    timestamps: true,
  }
);

// Prayer Model
const Prayer = mongoose.model('Prayer', prayerSchema);

// Export Prayer Model
export default Prayer;
