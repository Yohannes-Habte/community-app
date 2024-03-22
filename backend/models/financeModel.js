import mongoose from 'mongoose';

const { Schema } = mongoose;

// Finance Schema
const financeSchema = new Schema(
  {
    contribution: { type: Number, required: true },
    offer: { type: Number, required: true },
    servicePayment: { type: Number, required: true },
    frekdasie: { type: Number, required: true },
    choirExpense: { type: Number, required: true },
    eventExpense: { type: Number, required: true },
    priestExpense: { type: Number, required: true },
    guestExpense: { type: Number, required: true },
    presentExpense: { type: Number, required: true },
    tripExpense: { type: Number, required: true },
    otherExpense: { type: Number, required: true },
    date: { type: String, required: true, unique: true },
    total: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

// Finance Model
const Finance = mongoose.model('Finance', financeSchema);

// Export Finance Model
export default Finance;
