import express from "express";
import {
  countComments,
  createComment,
  deleteComment,
  getAllComments,
  getComment,
} from "../../controllers/comment/index.js";
import validateComment from "../../validators/comment/index.js";
import checkValidation from "../../validators/validationResult/index.js";

// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post(
  "/:id/new-comment",
  validateComment(),
  checkValidation,
  createComment
);
commentRouter.get("/:id", getComment);
commentRouter.delete("/:userId/:commentId", deleteComment);
commentRouter.get("/", getAllComments);
commentRouter.get("/count/all-comments", countComments);

// Export comment router
export default commentRouter;
