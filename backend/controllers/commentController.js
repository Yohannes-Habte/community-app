import createError from 'http-errors';
import Comment from '../models/commentModel.js';

//==========================================================================
// Create New Comment
//==========================================================================
export const createComment = async (req, res, next) => {
  const newComment = new Comment(req.body);
  try {
    const saveComment = await newComment.save();
    return res.status(200).json(saveComment);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'New Comment could not be created! Please try again')
    );
  }
};

//==========================================================================
// Update Comment
//==========================================================================
export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The comment could not be updated! Please try again')
    );
  }
};

//==========================================================================
// Get Comment
//==========================================================================
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The comment could not be accessed! Please try again')
    );
  }
};

//==========================================================================
// Delete Comment
//==========================================================================
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    await Comment.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(
        `The comment of ${comment.firstName} ${comment.lastName} has been successfully deleted.`
      );
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The comment could not be deleted! Please try again')
    );
  }
};

//==========================================================================
// Get all Comments
//==========================================================================
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The comments could not be accessed! Please try again')
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
        'The comment count could not be accessed! Please try again'
      )
    );
  }
};
