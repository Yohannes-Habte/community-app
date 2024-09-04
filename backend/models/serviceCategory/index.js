import mongoose from "mongoose";

const { Schema } = mongoose;

// Service Category Schema
const serviceCategorySchema = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

// Service Category Model
const Category = mongoose.model("Category", serviceCategorySchema);

// Export Service Category Model
export default Category;
