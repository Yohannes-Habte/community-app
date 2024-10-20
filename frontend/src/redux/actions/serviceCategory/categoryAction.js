import axios from "axios";
import {
  categoryStart,
  categorySuccess,
  categoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  fetchAllCategoriesStart,
  fetchAllCategoriesSuccess,
  fetchAllCategoriesFailure,
  countCategoriesStart,
  countCategoriesSuccess,
  countCategoriesFailure,
  clearErrors,
} from "../../reducers/serviceCategory/categoryReducer";
import { API } from "../../../utile/security/secreteKey";


// =============================================================================
// Fetch all categories
// =============================================================================

export const fetchAllCategories = () => async (dispatch) => {
  try {
    dispatch(fetchAllCategoriesStart());
    const { data } = await axios.get(`${API}/categories`);
    dispatch(fetchAllCategoriesSuccess(data.result));
  } catch (error) {
    dispatch(
      fetchAllCategoriesFailure(error.response?.data?.message || error.message)
    );
  }
};

// =============================================================================
// Add or update a category
// =============================================================================
export const updateCategory = (category) => async (dispatch) => {
  try {
    dispatch(categoryStart());
    const { data } = await axios.post(`${API}/categories`, category);
    dispatch(categorySuccess(data.result));
  } catch (error) {
    dispatch(categoryFailure(error.response?.data?.message || error.message));
  }
};

// =============================================================================
// Delete a category
// =============================================================================
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(deleteCategoryStart());
    await axios.delete(`${API}/categories/${categoryId}`);
    dispatch(deleteCategorySuccess());
  } catch (error) {
    dispatch(
      deleteCategoryFailure(error.response?.data?.message || error.message)
    );
  }
};

// =============================================================================
// Count all categories
// =============================================================================
export const countCategories = () => async (dispatch) => {
  try {
    dispatch(countCategoriesStart());
    const { data } = await axios.get(`${API}/categories/total/count`);
    dispatch(countCategoriesSuccess(data));
  } catch (error) {
    dispatch(
      countCategoriesFailure(error.response?.data?.message || error.message)
    );
  }
};

// =============================================================================
// Clear Errors
// =============================================================================
export const clearAllErrors = () => (dispatch) => {
  dispatch(clearErrors());
};
