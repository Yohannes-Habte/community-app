import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AddContribution from "../../forms/memberContribution/AddContribution";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import "./AllContributions.scss";

const AllContributions = () => {
  const [openAddContribution, setOpenAddContribution] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const allContributions = async () => {
      try {
        const { data } = await axios.get(`${API}/contributions`);
        setContributions(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    allContributions();
  }, []);

  // Delete a contribution
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/contributions/${id}`);
      setContributions(data.result);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // Parishioners header
  const columns = [
    { field: "id", headerName: "Contribution ID", width: 350 },
    { field: "user", headerName: "User ID", width: 350 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "date", headerName: "Contribution Date", width: 200 },
    { field: "amount", headerName: "Contribution Amount", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <button onClick={() => setOpen(true)} className="edit">
              <FaEdit />{" "}
            </button>
            <button onClick={handleDelete(params.id)} className="delete">
              <FaTrashAlt />{" "}
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [];
  contributions &&
    contributions.map((contribution) => {
      return rows.push({
        id: contribution._id,
        user: contribution.user,
        firstName: contribution.firstName,
        lastName: contribution.lastName,
        date: contribution.date,
        amount: contribution.amount,
      });
    });


  return (
    <section className="members-contribution-wrapper">
      <h3 className="members-contribution-title">
        Parishioners Contribution Table
      </h3>

      <aside className="add-contribution-aside">
        <h3 className="add-contribution-aside-title">
          Add Member Contribution
        </h3>
        <button
          onClick={() => setOpenAddContribution(true)}
          className="add-contribution-btn"
        >
          Add New Contribution
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
        // Search a specific user
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // Page size optons
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        //
      />

      {openAddContribution && (
        <AddContribution setOpen={setOpenAddContribution} />
      )}
    </section>
  );
};

export default AllContributions;
