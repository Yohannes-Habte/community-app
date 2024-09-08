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
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import { API } from "../../../utiles/securitiy/secreteKey";

const ServiceCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [categoryId, setCategoryId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // ========================================================================
  // Fetch all service categories on component mount
  // ========================================================================
  useEffect(() => {
    dispatch(fetchAllCategories());

    // Optional: Clear errors when the component unmounts
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // ========================================================================
  // Column definitions for DataGrid
  // ========================================================================
  const columns = [
    { field: "id", headerName: "Category ID", width: 300 },
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
              setCategoryId(params.id);
              setConfirmDeletion(true);
            }}
            className="delete"
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

  // ========================================================================
  // Delete a service category
  // ========================================================================
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/categories/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete category.";
      toast.error(errorMessage);
    } finally {
      // Refetch categories after deletion to ensure updated state
      dispatch(fetchAllCategories());
    }
  };

  return (
    <section
      className="service-category-table-container"
      style={{ height: "400px", width: "100%" }}
    >
      <h3 className="service-category-table-title">Service Categories</h3>

      <aside className="add-new-service-category">
        <h3 className="add-new-service-category-title">Add New Category</h3>
        <button
          onClick={() => setOpenCategory(true)}
          className="add-new-service-category-btn"
        >
          Add New
        </button>
      </aside>

      {loading && <PageLoader />}

      {error ? <p className="error-message"> {error} </p> : null}

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
        <article className="service-delete-confirmation-wrapper">
          <span
            className="delete-icon"
            onClick={() => setConfirmDeletion(false)}
          >
            X
          </span>

          <h3 className="you-want-delete">Are you sure you want to delete?</h3>

          <aside className="cancel-or-confirm-delete">
            <h3
              className="confirm-delete"
              onClick={() => {
                setConfirmDeletion(false);
                handleDelete(categoryId);
              }}
            >
              Confirm
            </h3>
            <p
              className="cancel-delete"
              onClick={() => setConfirmDeletion(false)}
            >
              Cancel
            </p>
          </aside>
        </article>
      )}

      {openCategory && <CategoryForm setOpenCategory={setOpenCategory} />}
    </section>
  );
};

export default ServiceCategories;
