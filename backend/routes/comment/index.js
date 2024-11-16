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
import { isAdmin, isAuthenticated } from "../../middlewares/auth/auth.js";


// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post(
  "/new",
  isAuthenticated,
  validateComment(),
  checkValidation,
  createComment
);

commentRouter.get("/:id", isAuthenticated, isAdmin, getComment);

commentRouter.delete("/:commentId", isAuthenticated, isAdmin, deleteComment);

commentRouter.get("/", isAuthenticated, isAdmin, getAllComments);

commentRouter.get("/total/count", isAuthenticated, isAdmin, countComments);

// Export comment router
export default commentRouter;
