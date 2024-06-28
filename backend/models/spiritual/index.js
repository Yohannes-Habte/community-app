import mongoose from 'mongoose';

const { Schema } = mongoose;

// Spiritual Development Schema
const spiritualDevelopmentSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    phone: { type: String, required: true },
    userStatus: { type: String, required: true },
    serviceStatus: { type: String, default: 'Pending' },
  },
  {
    timestamps: true,
  }
);

// Spiritual Development Model
const Spiritual = mongoose.model('Spiritual', spiritualDevelopmentSchema);

// Export Spiritual Model
export default Spiritual;
