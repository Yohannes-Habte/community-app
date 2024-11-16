import mongoose from "mongoose";

const { Schema } = mongoose;

// Comment Schema
const priestDelegationSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    serviceDate: { type: String, required: true },
    textMessage: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Priest Delegation Model
const Priest = mongoose.model("Priest", priestDelegationSchema);

// Export Priest Delegation Model
export default Priest;
