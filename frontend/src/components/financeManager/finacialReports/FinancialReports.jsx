import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./FinancialReports.scss";
import { API } from "../../../utiles/securitiy/secreteKey";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import ExpenseReportForm from "../financeReportForm/ExpenseReportForm";
import { toast } from "react-toastify";
import { MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import {
  clearFinancialReportErrors,
  fetchAllFinancialReports,
} from "../../../redux/actions/finance/financeAction";

const FinancialReports = () => {
  // Global state variables
  const { loading, error, financialReports } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  // Local state variables
  const [annualIncome, setAnnualIncome] = useState();
  const [openAddFinancialReport, setOpenAddFinancialReport] = useState(false);
  const [reportId, setReportId] = useState("");
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [filteredReports, setFilteredReports] = useState([]);

  // =======================================================================================
  // Fetch all financial reports without year filter
  // =======================================================================================
  useEffect(() => {
    dispatch(fetchAllFinancialReports());

    // clear errors on component unmount
    return () => {
      dispatch(clearFinancialReportErrors());
    };
  }, [dispatch]);

  // =======================================================================================
  // Total Surplus or Deficit
  // =======================================================================================
  useEffect(() => {
    const totalSum = async () => {
      try {
        const { data } = await axios.get(
          `${API}/reports/total/income?year=${year}`,
          { withCredentials: true }
        );
        setAnnualIncome(data.result);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    };

    if (year) {
      totalSum();
    }
  }, [year]);

  // =======================================================================================
  // Update filtered reports whenever financialReports or year changes
  // =======================================================================================
  useEffect(() => {
    if (financialReports) {
      const filtered = financialReports.filter((report) => {
        const reportYear = new Date(report.date).getFullYear();
        return reportYear.toString() === year; // Compare with selected year
      });
      setFilteredReports(filtered);
    }
  }, [financialReports, year]);

  // =======================================================================================
  // Financial Reports header
  // =======================================================================================
  const columns = [
    { field: "date", headerName: "Date", width: 120 },
    { field: "contribution", headerName: "Contribution", width: 150 },
    { field: "offer", headerName: "Offer", width: 100 },
    { field: "servicePayment", headerName: "Service Payment", width: 150 },
    { field: "frekdasie", headerName: "Frekdasie", width: 100 },
    { field: "choirExpense", headerName: "Choir", width: 100 },
    { field: "eventExpense", headerName: "Event", width: 100 },
    { field: "priestExpense", headerName: "Priest", width: 100 },
    { field: "guestExpense", headerName: "Guest", width: 100 },
    { field: "presentExpense", headerName: "Preset", width: 100 },
    { field: "tripExpense", headerName: "Trip", width: 100 },
    { field: "otherExpense", headerName: "Other", width: 100 },
    {
      field: "total",
      headerName: "Total",
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
      width: 70,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <Link to={`/services/${params.id}`} className="edit">
              <MdEditSquare />
            </Link>

            <button
              className="delete"
              onClick={() => setReportId(params.id) || setOpen(true)}
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
    },
  ];

  // =======================================================================================
  // Financial Reports rows
  // =======================================================================================
  const rows = [];

  filteredReports &&
    filteredReports.map((report) => {
      const date = new Date(report.date);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

      return rows.push({
        id: report._id,
        date: formattedDate,
        contribution: report?.contribution?.toFixed(2),
        offer: report?.offer?.toFixed(2),
        servicePayment: report.servicePayment?.toFixed(2),
        frekdasie: report?.frekdasie?.toFixed(2),
        choirExpense: report?.choirExpense?.toFixed(2),
        eventExpense: report?.eventExpense?.toFixed(2),
        priestExpense: report?.priestExpense?.toFixed(2),
        guestExpense: report?.guestExpense?.toFixed(2),
        presentExpense: report?.presentExpense?.toFixed(2),
        tripExpense: report?.tripExpense?.toFixed(2),
        otherExpense: report?.otherExpense?.toFixed(2),
        total: report?.total?.toFixed(2),
      });
    });

  // Handle delete for each report
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API}/reports/delete-report/${id}`,
        { withCredentials: true }
      );
      console.log("delete:", data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle submit for year filter
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredYear = e.target.elements.year.value;

    // Basic validation for the year
    if (enteredYear < 2000 || enteredYear > new Date().getFullYear()) {
      toast.error("Please enter a valid year.");
      return;
    }

    setYear(enteredYear); // Set the year in state
  };

  return (
    <section className="financial-report-table-container">
      <h1 className="financial-report-table-title">
        Financial Reports for the year {year}
      </h1>

      <form
        action=""
        onSubmit={handleSubmit}
        className="finance-report-table-form"
      >
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year only"
          className="input-field"
        />
        <button className="finance-report-table-form-btn">Search</button>
      </form>

      <article className="add-new-report">
        <h3 className="add-new-report-title"> Add Financial Reports </h3>
        <button
          onClick={() => setOpenAddFinancialReport(true)}
          className={"add-new-report-btn"}
        >
          Add New
        </button>
      </article>

      <section className="financial-reports-table">
        {loading && <PageLoader />}

        {error ? <p className="error-message"> {error} </p> : null}

        {!loading && !error && (
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
          />
        )}

        {annualIncome >= 0 ? (
          <h4 className="total-income-status">
            Total Surplus :{" "}
            <strong className="total-surplus">
              € {annualIncome?.toFixed(2)}{" "}
            </strong>
          </h4>
        ) : (
          <h4 className="total-income-status">
            Total Deficit :{" "}
            <strong className="total-deficit">
              € {annualIncome?.toFixed(2)}{" "}
            </strong>
          </h4>
        )}
      </section>

      {open && (
        <article className="service-delete-confirmation-wrapper">
          <span className="delete-icon" onClick={() => setOpen(false)}>
            X
          </span>

          <h3 className="you-want-delete">Are you sure you want delete?</h3>

          <aside className="cancel-or-confirm-delete">
            <h3
              className={`confirm-delete`}
              onClick={() => setOpen(false) || handleDelete(reportId)}
            >
              confirm
            </h3>
            <p className={`cancel-delete`} onClick={() => setOpen(false)}>
              cancel
            </p>
          </aside>
        </article>
      )}

      {openAddFinancialReport && (
        <ExpenseReportForm
          setOpenAddFinancialReport={setOpenAddFinancialReport}
        />
      )}
    </section>
  );
};

export default FinancialReports;
