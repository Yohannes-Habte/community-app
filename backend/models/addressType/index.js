import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// User Schema
const addressTypeSchema = new Schema(
  {
    addressType: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

// User Model
const AddressType = mongoose.model('AddressType', addressTypeSchema);

// Export User Model
export default AddressType;