import createError from "http-errors";
import Comment from "../../models/comment/index.js";
import Member from "../../models/member/index.js";

//==========================================================================
// Create New Comment
//==========================================================================
export const createComment = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await Member.findById(userId);

    if (!user) {
      return next(createError(400, "User not found!"));
    }

    const comment = new Comment(req.body);

    // Save comment in the database
    try {
      await comment.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Something went wrong!"));
    }

    user.comments.push(comment._id);

    console.log("user", user);
    // Save user after the comment is added in the database

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      return next(createError(500, "Something went wrong!"));
    }

    res.status(201).json({
      success: true,
      comment,
      message: "Comment has been successfully sent",
    });
  } catch (error) {
    return next(createError(500, "Comment could not be saved"));
  }
};

//==========================================================================
// Get Comment
//==========================================================================
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(createError(400, "Comment not found!"));
    }

    return res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Something went wrong!"));
  }
};

//==========================================================================
// Delete Comment
//==========================================================================
export const deleteComment = async (req, res, next) => {
  const userId = req.params.userId;
  const commentId = req.params.commentId;
  try {
    const user = await Member.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // instead of findByIdAndUpdate, you can use updateOne
    await Member.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $pull: { comments: { _id: commentId } } }
    );

    // Save user after the comment is added in the database
    try {
      await user.save();
    } catch (error) {
      return next(createError(500, "Something went wrong!"));
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(createError(404, "Comment not found"));
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment has been successfully deleted",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Something went wrong!"));
  }
};

//==========================================================================
// Get all Comments
//==========================================================================export const getAllComments = async (req, res, next) => {
export const getAllComments = async (req, res, next) => {
  const { email } = req.query;
  const name = fullName;

  try {
    let comments;
    if (name) {
      comments = await Comment.find(name && { name: fullName.split(" ")[0] });
    } else if (email && name) {
      comments = await Comment.find({ email, name });
    } else {
      comments = await Comment.find();
    }

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
    return next(
      createError(400, "The comments could not be accessed! Please try again")
    );
  }
};

//==========================================================================
// Get all comments count
//==========================================================================
export const countComments = async (req, res, next) => {
  try {
    const counts = await Comment.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        "The comment count could not be accessed! Please try again"
      )
    );
  }
};
