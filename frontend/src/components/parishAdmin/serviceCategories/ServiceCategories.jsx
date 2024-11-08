import { useEffect, useState } from "react";
import "./ServiceCategories.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllErrors,
  fetchAllCategories,
} from "../../../redux/actions/serviceCategory/categoryAction";
import CategoryForm from "../../forms/serviceCategory/CategoryForm";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { Alert } from "@mui/material";
import { API } from "../../../utile/security/secreteKey";

const ServiceCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [categoryId, setCategoryId] = useState(null);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());

    return () => {
      if (error) {
        dispatch(clearAllErrors());
      }
    };
  }, [dispatch, error]);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${API}/categories/${categoryId}`, {
        withCredentials: true,
      });
      toast.success(data.message);

      dispatch(fetchAllCategories());
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during deletion.";
      toast.error(errorMessage);
    } finally {
      setConfirmDeletion(false);
    }
  };

  // ========================================================================
  // Column definitions for DataGrid
  // ========================================================================
  const columns = [
    { field: "category", headerName: "Service Category", width: 300 },
    { field: "description", headerName: "Category Description", width: 300 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div className="action-wrapper">
          <FaTrashAlt
            onClick={() => {
              setCategoryId(params.id) || setConfirmDeletion(true);
            }}
            className="delete-icon"
            aria-label={`Delete category ${params.id}`}
          />
        </div>
      ),
    },
  ];

  // ========================================================================
  // Populate rows for DataGrid
  // ========================================================================
  const rows = categories?.map((category) => ({
    id: category._id,
    category: category.category,
    description: category.description || "No description provided",
  }));

  return (
    <section className="service-category-table-container">
      <h3 className="service-category-table-title">Service Categories</h3>

      <aside className="add-new-service-category">
        <h3 className="add-new-service-category-title">Add New Category</h3>
        <button
          onClick={() => setOpenCategory(true)}
          className="add-new-service-category-btn"
          aria-label="Add New Category"
        >
          Add New
        </button>
      </aside>

      {loading && (
        <PageLoader isLoading={loading} message="Loading" size={80} />
      )}

      {error ? <Alert className="error-message"> {error} </Alert> : null}

      {/* Categories DataGrid */}
      {!loading && !error && (
        <DataGrid
          rows={rows || []}
          columns={columns}
          autoHeight
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}

      {confirmDeletion && (
        <article className="category-service-delete-confirmation-modal">
          <h3 className="delete-confirmation-title">Delete Service Category</h3>
          <p className="delete-confirmation-statement">
            Are you sure you want to delete this category service? This action
            cannot be undone.
          </p>
          <div className="confirmation-buttons-wrapper">
            <button
              className="confirm-delete-btn"
              aria-label="Cancel deletion"
              onClick={() => setConfirmDeletion(false)}
            >
              Cancel
            </button>
            <button
              className="cancel-delete-btn"
              aria-label="Confirm deletion"
              onClick={() => {
                setConfirmDeletion(false);
                handleDelete(categoryId);
              }}
            >
              Delete
            </button>
          </div>
        </article>
      )}

      {openCategory && <CategoryForm setOpenCategory={setOpenCategory} />}
    </section>
  );
};

export default ServiceCategories;
