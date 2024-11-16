import mongoose from "mongoose";

const { Schema } = mongoose;

// Comment Schema
const commentSchema = new Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Comment Model
const Comment = mongoose.model("Comment", commentSchema);

// Export Comment Model
export default Comment;
