import mongoose from 'mongoose';

const { Schema } = mongoose;

// Finance Schema
const financeSchema = new Schema(
  {
    offer: { type: Number, required: true },
    donation: { type: Number, required: true },
    priestExpense: { type: Number, required: true },
    choirExpense: { type: Number, required: true },
    generalExpense: { type: Number, required: true },
    date: { type: Date, required: true, unique: true },
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
