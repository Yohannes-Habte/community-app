import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./FinancialReports.scss";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import ExpenseReportForm from "../financeReportForm/ExpenseReportForm";
import { toast } from "react-toastify";
import { MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import {
  clearFinancialReportErrors,
  fetchAllFinancialReports,
} from "../../../redux/actions/finance/financeAction";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { Alert } from "@mui/material";
import { API } from "../../../utile/security/secreteKey";


const FinancialReports = () => {
  const { loading, error, financialReports } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  const [annualIncome, setAnnualIncome] = useState(0);
  const [openAddFinancialReport, setOpenAddFinancialReport] = useState(false);
  const [reportId, setReportId] = useState("");
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("2022");
  const [filteredReports, setFilteredReports] = useState([]);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Fetch all financial reports and annual income for the default year (2022)
  useEffect(() => {
    dispatch(fetchAllFinancialReports());
    fetchTotalIncome("2022");
    return () => {
      dispatch(clearFinancialReportErrors());
    };
  }, [dispatch]);

  // Function to fetch total income based on the selected year
  const fetchTotalIncome = useCallback(async (year) => {
    try {
      const { data } = await axios.get(
        `${API}/reports/total/income?year=${year}`,
        { withCredentials: true }
      );
      setAnnualIncome(data.result || 0);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch income data.";
      toast.error(message);
    }
  }, []);

  // Filter reports based on the selected year
  useEffect(() => {
    if (financialReports) {
      const filtered = financialReports.filter((report) => {
        const reportYear = new Date(report.date).getFullYear();
        return reportYear.toString() === year;
      });
      setFilteredReports(filtered);
    }
  }, [financialReports, year]);

  // DataGrid columns for displaying financial reports
  const columns = [
    { field: "date", headerName: "Date", width: 120 },
    { field: "contribution", headerName: "Contribution (€)", width: 150 },
    { field: "offer", headerName: "Offer (€)", width: 100 },
    { field: "servicePayment", headerName: "Service Payment (€)", width: 150 },
    { field: "frekdasie", headerName: "Frekdasie (€)", width: 100 },
    { field: "choirExpense", headerName: "Choir (€)", width: 100 },
    { field: "eventExpense", headerName: "Event (€)", width: 100 },
    { field: "priestExpense", headerName: "Priest (€)", width: 100 },
    { field: "guestExpense", headerName: "Guest (€)", width: 100 },
    { field: "presentExpense", headerName: "Preset (€)", width: 100 },
    { field: "tripExpense", headerName: "Trip (€)", width: 100 },
    { field: "otherExpense", headerName: "Other (€)", width: 100 },
    {
      field: "total",
      headerName: "Total (€)",
      width: 100,
      renderCell: (params) => {
        const totalValue = params.value;
        return (
          <span
            style={{
              color: totalValue < 0 ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            € {totalValue}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div className="action-wrapper">
          <Link
            to={`/services/${params.id}`}
            className="edit"
            aria-label="Edit report"
            title="Edit report"
          >
            <MdEditSquare />
          </Link>
          <button
            className="delete"
            onClick={() => {
              setReportId(params.id);
              setOpen(true);
            }}
            aria-label="Delete report"
            title="Delete report"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  // Financial Reports rows for DataGrid
  const rows = filteredReports.map((report) => {
    const date = new Date(report.date);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;

    const formatWithEuro = (value) =>
      value !== undefined ? `€ ${value.toFixed(2)}` : "€0.00";

    return {
      id: report._id,
      date: formattedDate,
      contribution: formatWithEuro(report?.contribution),
      offer: formatWithEuro(report?.offer),
      servicePayment: formatWithEuro(report?.servicePayment),
      frekdasie: formatWithEuro(report?.frekdasie),
      choirExpense: formatWithEuro(report?.choirExpense),
      eventExpense: formatWithEuro(report?.eventExpense),
      priestExpense: formatWithEuro(report?.priestExpense),
      guestExpense: formatWithEuro(report?.guestExpense),
      presentExpense: formatWithEuro(report?.presentExpense),
      tripExpense: formatWithEuro(report?.tripExpense),
      otherExpense: formatWithEuro(report?.otherExpense),
      total: report?.total?.toFixed(2) || "€0.00",
    };
  });

  // Handle deleting a financial report
  const handleDelete = async (id) => {
    setIsButtonLoading(true);
    try {
      await axios.delete(`${API}/reports/delete-report/${id}`, {
        withCredentials: true,
      });
      toast.success("Report deleted successfully.");
      dispatch(fetchAllFinancialReports());
    } catch (error) {
      toast.error("Failed to delete report. Please try again.");
    } finally {
      setIsButtonLoading(false);
    }
  };

  // Handle form submission for year filtering
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const enteredYear = e.target.elements.year.value.trim();

      if (
        !enteredYear ||
        isNaN(enteredYear) ||
        enteredYear < 2022 ||
        enteredYear > new Date().getFullYear()
      ) {
        alert(
          `Please enter a valid year between 2022 and ${new Date().getFullYear()}`
        );
        return;
      }

      setYear(enteredYear);
      setIsButtonLoading(true);
      await fetchTotalIncome(enteredYear);
      setIsButtonLoading(false);
    },
    [fetchTotalIncome]
  );

  return (
    <section className="financial-report-table-container">
      <h1 className="financial-report-table-title">
        Financial Reports for {year}
      </h1>

      {/* Year Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="finance-report-table-form"
        aria-label="Year filter form"
      >
        <input
          type="number"
          name="year"
          defaultValue={2022}
          placeholder="Enter Year"
          className="input-field"
          aria-label="Year input field"
        />
        <button
          type="submit"
          disabled={loading || isButtonLoading}
          className="finance-report-table-form-btn"
          aria-label="Submit year filter"
        >
          {isButtonLoading ? (
            <ButtonLoader isLoading={isButtonLoading} size={24} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Add New Report */}
      <article className="add-new-report">
        <h3 className="add-new-report-title">Add Financial Report</h3>
        <button
          onClick={() => setOpenAddFinancialReport(true)}
          className="add-new-report-btn"
          aria-label="Add new financial report"
        >
          Add Report
        </button>
      </article>

      {/* Financial Reports Table */}
      <section className="financial-reports-table">
        {loading ? (
          <PageLoader isLoading={loading} size={80} />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : !loading && !error && financialReports.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 12 },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[5, 12]}
            checkboxSelection
            disableRowSelectionOnClick
            aria-label="Financial reports table"
          />
        ) : (
          <Alert severity="error">No financial reports found for {year}!</Alert>
        )}

        {annualIncome !== null && (
          <h4 className="total-income-status">
            {annualIncome >= 0 ? "Total Surplus" : "Total Deficit"}:{" "}
            <strong
              className={annualIncome >= 0 ? "total-surplus" : "total-deficit"}
            >
              € {annualIncome?.toFixed(2)}
            </strong>
          </h4>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {open && (
        <article className="service-delete-confirmation-wrapper">
          <span
            className="delete-icon"
            onClick={() => setOpen(false)}
            aria-label="Close delete confirmation"
          >
            X
          </span>
          <h3 className="you-want-delete">
            Are you sure you want to delete this report?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <h3
              className="confirm-delete"
              onClick={() => {
                setOpen(false);
                handleDelete(reportId);
              }}
              aria-label="Confirm delete report"
            >
              Confirm
            </h3>
            <p
              className="cancel-delete"
              onClick={() => setOpen(false)}
              aria-label="Cancel delete report"
            >
              Cancel
            </p>
          </aside>
        </article>
      )}

      {/* Add Financial Report Form Modal */}
      {openAddFinancialReport && (
        <ExpenseReportForm
          setOpenAddFinancialReport={setOpenAddFinancialReport}
        />
      )}
    </section>
  );
};

export default FinancialReports;
