import axios from "axios";
import { useEffect, useState } from "react";
import "./FinancialReports.scss";
import { API } from "../../../utiles/securitiy/secreteKey";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import ExpenseReportForm from "../financeReportForm/ExpenseReportForm";
import {
  fetchAllFinancialReportsFailure,
  fetchAllFinancialReportsStart,
  fetchAllFinancialReportsSuccess,
} from "../../../redux/reducers/financeReducer";
import { toast } from "react-toastify";

const FinancialReports = () => {
  // Global state variables
  const { reportsLoading, reportsError, financialReports } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  // Local state variables
  const [total, setTotal] = useState();
  const [open, setOpen] = useState(false);

  // Display all financial income and expenses in the table
  useEffect(() => {
    const fetchAllFinancialReportData = async () => {
      try {
        dispatch(fetchAllFinancialReportsStart());
        const { data } = await axios.get(`${API}/reports/financial-reports`);

        dispatch(fetchAllFinancialReportsSuccess(data.reports));
      } catch (error) {
        dispatch(fetchAllFinancialReportsFailure(error.response.data.message));
      }
    };
    fetchAllFinancialReportData();
  }, []);

  // Total Income
  useEffect(() => {
    const totalSum = async () => {
      try {
        const { data } = await axios.get(
          `${API}/reports/total/surplus-or-deficit`
        );
        setTotal(data.totalSum);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    totalSum();
  }, []);

  // Handle delete for each report
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/reports/delete-report/${id}`);
      console.log("delete:", data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="financial-report-container">
      <h1 className="financial-report-title">Financial Reports</h1>
      <section className="financial-reports-table">
        <article className="add-expense">
          <h3 className="add-title"> Add Financial Reports </h3>
          <button onClick={() => setOpen(true)} className={"link"}>
            Add New
          </button>
        </article>

        <table className="financial-report-table">
          <thead className="table-head">
            <tr className="table-head-row">
              <th className="head-cell"> Date </th>
              <th className="head-cell"> Offer </th>
              <th className="head-cell"> Contribution </th>
              <th className="head-cell"> Frekdassie </th>
              <th className="head-cell"> Event </th>
              <th className="head-cell"> Services </th>
              <th className="head-cell"> Choir </th>
              <th className="head-cell"> Priest </th>
              <th className="head-cell"> Guest </th>
              <th className="head-cell"> Present </th>
              <th className="head-cell"> Trip </th>
              <th className="head-cell"> Other </th>
              <th className="head-cell"> Total </th>
              <th className="head-cell"> Action </th>
            </tr>
          </thead>

          <tbody className="table-body">
            {reportsLoading ? (
              <PageLoader />
            ) : reportsError ? (
              <p>{reportsError} </p>
            ) : (
              financialReports.map((report) => {
                return (
                  <tr key={report._id} className="table-body-row">
                    <td className="body-cell"> {report.date} </td>
                    <td className="body-cell"> €{report.offer} </td>
                    <td className="body-cell"> €{report.contribution} </td>
                    <td className="body-cell"> €{report.frekdasie} </td>
                    <td className="body-cell"> €{report.eventExpense} </td>
                    <td className="body-cell"> €{report.servicePayment} </td>
                    <td className="body-cell"> €{report.choirExpense} </td>
                    <td className="body-cell">€{report.priestExpense} </td>
                    <td className="body-cell">€{report.guestExpense} </td>
                    <td className="body-cell">€{report.presentExpense} </td>
                    <td className="body-cell">€{report.tripExpense} </td>
                    <td className="body-cell"> €{report.otherExpense} </td>
                    <td className={report.total < 0 ? "negative" : "positive"}>
                      <strong>€{report.total}</strong>{" "}
                    </td>
                    <td className="body-cell-action">
                      <FaTrashAlt
                        className="delete-icon"
                        onClick={() => handleDelete(report._id)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {total && total >= 0 ? (
          <h4 className="total-income-status">
            Total Surplus :{" "}
            <strong className="total-surplus">€ {total?.toFixed(2)} </strong>
          </h4>
        ) : (
          <h4 className="total-income-status">
            Total Deficit :{" "}
            <strong className="total-deficit">€ {total?.toFixed(2)} </strong>
          </h4>
        )}
      </section>
      {open && <ExpenseReportForm setOpen={setOpen} />}
    </section>
  );
};

export default FinancialReports;
