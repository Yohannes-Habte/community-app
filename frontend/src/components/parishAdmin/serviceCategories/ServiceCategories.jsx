import { useState } from "react";
import "./ServiceCategories.scss";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CategoryForm from "../../forms/serviceCategory/CategoryForm";
import { FaTrashAlt } from "react-icons/fa";

const ServiceCategories = () => {
  const [categoryId, setCategoryId] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // ========================================================================
  // Delete a service category
  // ========================================================================
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/categories/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // allUsers();
  };

  const columns = [
    { id: "id", headerName: "Genre ID", width: 100 },
    { field: "category", headerName: "Book Category", width: 250 },
    { field: "description", headerName: "Genre Description", width: 600 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <FaTrashAlt
              onClick={() =>
                setCategoryId(params.id) || setConfirmDeletion(true)
              }
              className="delete"
            />
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: "sfs13",
      category: "Book category",
      description:
        "A great book description is one of your best marketing tools, but too often authors have a book description that isn't enticing, and doesn't convey what category the book is, and what the book is actually about.",
      createdAt: "24/05/1986",
    },
  ];

  return (
    <section
      className="service-category-table-container"
      style={{ height: "400px", width: "100%" }}
    >
      <h3 className="service-category-table-title"> Service Categories </h3>

      <aside className="add-new-service-category">
        <h3 className="add-new-service-category-title">Add New Category</h3>
        <button
          onClick={() => setOpenCategory(true)}
          className="add-new-service-category-btn"
        >
          Add New
        </button>
      </aside>
      <DataGrid
        // Rows
        rows={rows}
        // Columns
        columns={columns}
        // Initial state
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // Create search bar
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

      {confirmDeletion && (
        <article className="service-delete-confirmation-wrapper">
          <span
            className="delete-icon"
            onClick={() => setConfirmDeletion(false)}
          >
            X
          </span>

          <h3 className="you-want-delete-user">
            Are you sure you want delete this service?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <p
              className={`cancel-delete`}
              onClick={() => setConfirmDeletion(false)}
            >
              cancel
            </p>
            <h3
              className={`confirm-delete`}
              onClick={() =>
                setConfirmDeletion(false) || handleDelete(categoryId)
              }
            >
              confirm
            </h3>
          </aside>
        </article>
      )}

      {openCategory && <CategoryForm setOpenCategory={setOpenCategory} />}
    </section>
  );
};

export default ServiceCategories;
