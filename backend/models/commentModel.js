import mongoose from 'mongoose';

const { Schema } = mongoose;

// Comment Schema
const commentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Comment Model
const Comment = mongoose.model('Comment', commentSchema);

// Export Comment Model
export default Comment;
