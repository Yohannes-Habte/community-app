import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import "./MonthlyContribution.scss";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { API } from "../../../utile/security/secreteKey";

const MonthlyContribution = () => {
  const { currentUser } = useSelector((state) => state.member);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberContributions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API}/contributions/user/contribution`,
          {
            withCredentials: true,
          }
        );
        setContributions(response.data.result || []);
      } catch (error) {
        setError(error.message || "Failed to fetch contributions");
        toast.error(error.message || "Failed to fetch contributions");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchMemberContributions();
    }
  }, [currentUser]);

  const columns = [
    { field: "date", headerName: "Contribution Date", width: 200 },
    { field: "amount", headerName: "Contribution Amount", width: 200 },
  ];

  // Map contributions to rows if there is data
  const rows =
    contributions && contributions.length > 0
      ? contributions.map((contribution) => ({
          id: contribution._id,
          date: contribution?.date
            ? new Date(contribution.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "N/A",
          amount:
            typeof contribution.amount === "number"
              ? contribution.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "N/A",
        }))
      : [];

  return (
    <section className="user-monthly-contribution-container">
      <h1 className="user-monthly-contribution-title">
        {currentUser ? `${currentUser.firstName}'s` : "User"} Monthly
        Contributions
      </h1>

      {loading ? (
        <PageLoader isLoading={loading} message="Loading..." size={80} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : rows.length === 0 ? (
        <Alert severity="info">No contributions yet</Alert>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) =>
            row.id || Math.random().toString(36).substring(2, 9)
          } // Fallback ID if none present
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      )}
    </section>
  );
};

export default MonthlyContribution;
