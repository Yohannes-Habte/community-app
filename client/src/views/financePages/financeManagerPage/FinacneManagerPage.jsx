import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FinacneManagerPage.scss';
import ExpenseReportForm from '../../../components/financeManager/financeReportForm/ExpenseReportForm';
import Header from '../../../components/user/layout/header/Header';
import { API } from '../../../utiles/securitiy/secreteKey';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import {
  getALLFinancialReportFailure,
  getALLFinancialReportStart,
  getALLFinancialReportSuccess,
} from '../../../redux/reducers/financeReducer';
import PageLoader from '../../../utiles/loader/pageLoader/PageLoader';

const FinacneManagerPage = () => {
  // Global state variables
  const { reportsLoading, reportsError, financialReports } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  // Local state variables
  const [total, setTotal] = useState();
  const [open, setOpen] = useState(false);

  // Display financial income and expenses in the table
  useEffect(() => {
    const fechFinancialData = async () => {
      try {
        dispatch(getALLFinancialReportStart());
        const { data } = await axios.get(`${API}/reports/financial-reports`);

        dispatch(getALLFinancialReportSuccess(data.reports));
      } catch (error) {
        dispatch(getALLFinancialReportFailure(error.response.data.message));
      }
    };
    fechFinancialData();
  }, []);

  // Handle delete
  const handleDelete = async (Id) => {
    try {
      const { data } = await axios.delete(`${API}/reports/${Id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="financial-manager-page">
      <Header />
      <section className="financial-manager-page-container">
        <h1 className="financial-manager-title">Financial Reports</h1>
        <section className="financial-expenses-table">
          <article className="add-expense">
            <h3 className="add-title"> Add Financial Reports </h3>
            <button onClick={() => setOpen(true)} className={'link'}>
              Add New
            </button>
          </article>

          <table className="financial-report-table">
            <thead className="table-head">
              <tr className="table-head-row">
                <th className="head-cell"> Date </th>
                <th className="head-cell"> Contribution </th>
                <th className="head-cell"> Offer </th>
                <th className="head-cell"> Mass </th>
                <th className="head-cell"> Services </th>
                <th className="head-cell"> Choir </th>
                <th className="head-cell"> Event </th>
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
                      <td className="body-cell"> €{report.contribution} </td>
                      <td className="body-cell"> €{report.offer} </td>
                      <td className="body-cell"> €{report.servicePayment} </td>
                      <td className="body-cell"> €{report.frekdasie} </td>
                      <td className="body-cell"> €{report.choirExpense} </td>
                      <td className="body-cell"> €{report.eventExpense} </td>
                      <td className="body-cell">€{report.priestExpense} </td>
                      <td className="body-cell">€{report.guestExpense} </td>
                      <td className="body-cell">€{report.presentExpense} </td>
                      <td className="body-cell">€{report.tripExpense} </td>
                      <td className="body-cell"> €{report.otherExpense} </td>
                      <td
                        className={report.total < 0 ? 'negative' : 'positive'}
                      >
                        <strong>€{report.total}</strong>{' '}
                      </td>
                      <td className="body-cell-action">
                        <FaTrashAlt onClick={() => handleDelete(report._id)} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <h4 className="total-income">
            Total Income for the year 2022 was{' '}
            <span className="total">€ {total} </span>
          </h4>
        </section>
      </section>

      {open && <ExpenseReportForm setOpen={setOpen} />}
    </main>
  );
};

export default FinacneManagerPage;
