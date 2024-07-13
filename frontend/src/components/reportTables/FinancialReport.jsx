import { useEffect, useState } from "react";
import "./Tables.scss";
import axios from "axios";
import { API } from "../../utiles/securitiy/secreteKey";
import { FaTrashAlt } from "react-icons/fa";
import { fetchAllFinancialReportsFailure, fetchAllFinancialReportsStart, fetchAllFinancialReportsSuccess } from "../../redux/reducers/financeReducer";
import { useDispatch, useSelector } from "react-redux";

const FinancialReport = () => {
  const { financialReports } = useSelector((state) => state.finance);
  const dispatch = useDispatch();
  // Global Functions
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

  // Local state variable
  const [total, setTotal] = useState();

  // Display surplus or deficit from the financial report table
  useEffect(() => {
    const totalSurplusOrDeficit = async () => {
      try {
        const { data } = await axios.get(
          `${API}/reports/total/surplus-or-deficit`
        );
        setTotal(data.totalSum);
      } catch (error) {
        console.log(error);
      }
    };
    totalSurplusOrDeficit();
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
    <section className="report-table-container">
      <table className="report-table">
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
          {financialReports &&
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
            })}
        </tbody>
      </table>

      <h4 className="total-income">
        Total Income for the year 2022 was{" "}
        <span className="total">€ {total},00 </span>
      </h4>
    </section>
  );
};

export default FinancialReport;
