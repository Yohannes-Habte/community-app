import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String, default: "https://i.ibb.co/4pDNDk1/avatar.png" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
      default: "single",
    },

    addresses: [
      {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        zipCode: { type: String, required: true },
        addressType: {
          type: String,
          enum: ["Home", "Office", "Business"],
          default: "Home",
          required: true,
        },
      },
    ],

    monthlyContributions: [
      { type: mongoose.Types.ObjectId, ref: "Contribution" },
    ],
    services: [{ type: mongoose.Types.ObjectId, ref: "Service" }],
    delegatedPriests: [{ type: mongoose.Types.ObjectId, ref: "Priest" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],

    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "priest", "financeManager"],
    },

    agree: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Compile and export User model
const User = mongoose.model("User", userSchema);

// Export User Model
export default User;
