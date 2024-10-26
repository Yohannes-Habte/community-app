import Category from "../../models/serviceCategory/index.js";
import createError from "http-errors";

// Middleware to fetch category name
const fetchCategoryMiddleware = async (req, res, next) => {
  try {
    const serviceGroup = await Category.findById(req.body.serviceCategory);
    if (!serviceGroup) {
      return next(createError(400, "Service category not found"));
    }
    req.body.categoryName = serviceGroup.category; // Attach category name
    next();
  } catch (error) {
    next(error);
  }
};

export default fetchCategoryMiddleware;
