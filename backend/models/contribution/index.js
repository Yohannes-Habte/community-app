import mongoose from 'mongoose';

const { Schema } = mongoose;

// Contribution Schema
const contributionSchema = new Schema(
  {
    userCode: { type: String, default: 'none' },
    donation: { type: Number, required: true },
    date: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

// Contribution Model
const Contribution = mongoose.model('Contribution', contributionSchema);

// Export Contribution Model
export default Contribution;


