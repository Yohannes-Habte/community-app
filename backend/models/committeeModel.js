import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// User Schema
const committeeSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    title: { type: String, required: true },
    phone: { type: String, required: true },
    startingTime: { type: String, required: true },
    endingTime: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Before saving the user password, encrypt it
committeeSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// User Model
const Committee = mongoose.model('Committee', committeeSchema);

// Export User Model
export default Committee;
