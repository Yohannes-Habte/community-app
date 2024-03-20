import mongoose from 'mongoose';

const { Schema } = mongoose;

// Sacrament Schema
const sacramentSchema = new Schema(
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

// Sacrament Model
const Sacrament = mongoose.model('Sacrament', sacramentSchema);

// Export Sacrament Model
export default Sacrament;
