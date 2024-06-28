import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

// User Schema
const memberSchema = new Schema(
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
    maritalStatus: { type: String, default: "Single" },

    addresses: [
      {
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        zipCode: { type: String, required: true },
        addressType: { type: String, required: true, unique: true },
      },
    ],

    monthlyContribution: [],
    comments: [],

    services: [],
    delegatedPriests: [{ type: mongoose.Types.ObjectId, ref: "Priest" }],
    userCode: { type: String, default: "none" },

    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "priest", "financeManager"],
    },

    agree: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Before saving the user password, encrypt it
memberSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// User Model
const Member = mongoose.model("User", memberSchema);

// Export User Model
export default Member;

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const { Schema } = mongoose;

// // User Schema
// const memberSchema = new Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     image: { type: String, default: 'https://i.ibb.co/4pDNDk1/avatar.png' },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//     street: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     country: { type: String, required: true },
//     maritalStatus: { type: String, default: 'Single' },

//     addresses: [
//       {
//         country: { type: String, required: true },
//         state: { type: String, required: true },
//         city: { type: String, required: true },
//         address: { type: String, required: true },
//         zipCode: { type: String, required: true },
//         addressType: { type: String, required: true, unique: true },
//       },
//     ],

//     monthlyContribution: [],
//     // comments: [{
//     //   id:{type:String, required},
//     //   text:{type:String, required}
//     // }],
//     comments: [],
//     services: [],
//     delegatedPriests: [{ type: mongoose.Types.ObjectId, ref: 'Priest' }],
//     userCode: { type: String, default: 'none' },

//     role: {
//       type: String,
//       default: 'member',
//       enum: ['member', 'admin', 'priest', 'financeManager'],
//     },

//     agree: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Before saving the user password, encrypt it
// memberSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) return next();
//     const hashedPassword = await bcrypt.hash(this.password, 12);
//     this.password = hashedPassword;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// // User Model
// const Member = mongoose.model('User', memberSchema);

// // Export User Model
// export default Member;
