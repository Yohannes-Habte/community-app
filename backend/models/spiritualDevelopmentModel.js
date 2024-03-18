import mongoose from 'mongoose';

const { Schema } = mongoose;

// Spritual Development Schema
const spiritualDevelopmentSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    phone: { type: String, required: true },
    userStatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Spritual Development Model
const Spiritual = mongoose.model('Spiritual', spiritualDevelopmentSchema);

// Export Spritual Model
export default Spiritual;
