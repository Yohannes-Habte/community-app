import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// User Schema
const memberSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String, default: 'https://i.ibb.co/4pDNDk1/avatar.png' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    maritalStatus: { type: String, default: 'Single' },

    monthlyContribution: [
      {
        amount: { type: Number, required: true },
        month: { type: String, required: true },
        phone: { type: String, required: true },
        userStatus: { type: String, required: true },
      },
    ],

    comments: [],

    services: [
      {
        serviceName: { type: String, required: true },
        ServiceDate: { type: String, required: true },
        userPhone: { type: String, required: true },
        userStatus: { type: String, required: true },
        serviceStatus: { type: String, default: 'Pending' },
      },
    ],

    role: {
      type: String,
      default: 'member',
      enum: ['member', 'admin', 'priest'],
    },

    agree: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Before saving the user password, encrypt it
memberSchema.pre('save', async function (next) {
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
const Member = mongoose.model('User', memberSchema);

// Export User Model
export default Member;
