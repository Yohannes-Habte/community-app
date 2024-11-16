import createError from "http-errors";
import Comment from "../../models/comment/index.js";
import User from "../../models/member/index.js";
import mongoose from "mongoose";

//==========================================================================
// Create New Comment
//==========================================================================
export const createComment = async (req, res, next) => {
  const userId = req.user.id;

  // Validate user id
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(createError(400, "Invalid user ID"));
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(400, "User not found!"));
    }

    const comment = new Comment(req.body);

    await comment.save();

    user.comments.push(comment._id);

    await user.save();

    res.status(201).json({
      success: true,
      result: comment,
      message: "Comment has been successfully sent",
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again"));
  }
};

//==========================================================================
// Get Comment
//==========================================================================
export const getComment = async (req, res, next) => {
  const commentId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return next(createError(400, "Invalid comment ID"));
  }
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(createError(400, "Comment not found!"));
    }

    return res.status(200).json({
      success: true,
      result: comment,
    });
  } catch (error) {
    return next(createError(500, "Server error! Please try again"));
  }
};

//==========================================================================
// Delete Single Comment
//==========================================================================
export const deleteComment = async (req, res, next) => {
  const userId = req.user.id;
  const commentId = req.params.commentId;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(createError(400, "Invalid user ID."));
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return next(createError(400, "Invalid comment ID."));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the user
    const user = await User.findById(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, "User not found."));
    }

    // Check user role
    if (user.role !== "admin") {
      await session.abortTransaction();
      session.endSession();
      return next(
        createError(403, "Forbidden! You cannot perform this action.")
      );
    }

    // Ensure the comment exists
    const comment = await Comment.findById(commentId).session(session);

    if (!comment) {
      await session.abortTransaction();
      session.endSession();
      return next(createError(404, "Comment not found."));
    }

    // Remove the comment from the user's comments array
    await User.updateMany(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { session }
    );

    // Delete the comment
    await Comment.findByIdAndDelete(commentId, { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Comment successfully deleted.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(createError(500, "Server error. Please try again later."));
  }
};

//==========================================================================
// Get all Comments
//==========================================================================export const getAllComments = async (req, res, next) => {
export const getAllComments = async (req, res, next) => {
  try {
    const { search } = req.query;

    // Build the user filter dynamically if search term is provided
    const userFilter = {};

    if (search) {
      // Use regular expressions to search firstName, lastName, or email
      userFilter.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    // Perform aggregation to filter by user fields and fetch comments
    const comments = await Comment.aggregate([
      {
        $lookup: {
          from: "users", // Name of the collection you want to join with (the "users" collection).
          localField: "user", // The field in the current collection (Comment) that contains the reference to the users collection.
          foreignField: "_id", // The field in the "users" collection that corresponds to the value in the localField.
          as: "userDetails", // The name of the new array field in the resulting documents that will store the joined data.
        },
      },
      { $unwind: "$userDetails" }, // Deconstruct the array from $lookup into individual documents.
      {
        $match: userFilter, // Apply a filter to match specific criteria (based on userFilter).
      },
    ]);

    // Check if no comments are found
    if (!comments || comments.length === 0) {
      return next(
        createError(404, "No comments found with the specified criteria.")
      );
    }

    // If comments are found, send a successful response with the comments
    return res.status(200).json({
      success: true,
      result: comments,
    });
  } catch (error) {
    return next(
      createError(500, "An error occurred while retrieving comments.")
    );
  }
};

//==========================================================================
// Get all comments count
//==========================================================================
export const countComments = async (req, res, next) => {
  try {
    const counts = await Comment.countDocuments();
    return res.status(200).json({ success: true, result: counts });
  } catch (error) {
    return next(createError(400, "Server error! Please try again later."));
  }
};
