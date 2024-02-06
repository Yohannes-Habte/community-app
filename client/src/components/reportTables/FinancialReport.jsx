import React, { useEffect, useState } from 'react';
import './Tables.scss';
import axios from 'axios';
import FetchData from '../../utiles/globalFunctions/GlobalClientFunction';

const FinancialReport = () => {
  // Global Functions
  const { data, loading, error, reFetching, deleteData } = FetchData(
    'http://localhost:4000/api/finances'
  );

  // Local state variable
  const [total, setTotal] = useState();

  // Display surplus or deficit from the financial report table
  useEffect(() => {
    const totalSuplusOrDeficit = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/finances/total/surplus-or-deficit'
        );
        setTotal(data);
      } catch (error) {
        console.log(error);
      }
    };
    totalSuplusOrDeficit();
  }, []);

  return (
    <section className="report-table-container">
      <table className="report-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <th className="head-cell"> Date </th>
            <th className="head-cell"> Offer </th>
            <th className="head-cell"> Donation </th>
            <th className="head-cell"> Mass </th>
            <th className="head-cell"> Choir </th>
            <th className="head-cell"> Event </th>
            <th className="head-cell"> Priest </th>
            <th className="head-cell"> Other </th>
            <th className="head-cell"> Total </th>
          </tr>
        </thead>

        <tbody className="table-body">
          {data.map((expense) => {
            return (
              <tr key={expense._id} className="table-body-row">
                <td className="body-cell"> {expense.date} </td>
                <td className="body-cell"> €{expense.offer} </td>
                <td className="body-cell"> €{expense.donation} </td>
                <td className="body-cell"> €{expense.frekdasie} </td>
                <td className="body-cell"> €{expense.choirExpense} </td>
                <td className="body-cell"> €{expense.eventExpense} </td>
                <td className="body-cell">€{expense.priestExpense} </td>
                <td className="body-cell"> €{expense.otherExpense} </td>
                <td className={expense.total < 0 ? 'negative' : 'positive'}>
                  <strong>€{expense.total}</strong>{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h4 className="total-income">
        Total Income for the year 2022 was{' '}
        <span className="total">€ {total},00 </span>
      </h4>
    </section>
  );
};

export default FinancialReport;
