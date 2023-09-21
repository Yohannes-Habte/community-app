import React, { useEffect, useState } from 'react';
import './Finance.scss';
import Menu from '../../components/menu/Menu';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AddNewFinance from '../../components/addNew/AddNewFinance';

const Finance = () => {
  // Local state variables
  const [total, setTotal] = useState();
  const [finances, setFinances] = useState([]);
  const [open, setOpen] = useState(false);

  // Display financial income and expenses in the table
  useEffect(() => {
    const fechFinancialData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/finances');

        setFinances(data);
      } catch (error) {
        console.log(error);
      }
    };
    fechFinancialData();
  }, []);

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

  // Handle delete
  const handleDelete = async (Id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/finances/${Id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="finance-page">
      <Menu />
      <section className="finance-container">
        <h1 className="finance-title">Financial Reports</h1>
        <section className="financial-expenses-table">
          <article className="add-expense">
            <h3 className="add-title"> Financial Reports </h3>
            <button onClick={() => setOpen(true)} className={'link'}>
              Add New
            </button>
          </article>

          <table className="financial-report-table">
            <thead className="table-head">
              <tr className="table-head-row">
                <th className="head-cell"> Date </th>
                <th className="head-cell"> Donation </th>
                <th className="head-cell"> Offer </th>
                <th className="head-cell"> Mass </th>
                <th className="head-cell"> Choir </th>
                <th className="head-cell"> Event </th>
                <th className="head-cell"> Priest </th>
                <th className="head-cell"> Other </th>
                <th className="head-cell"> Total </th>
                <th className="head-cell"> Action </th>
              </tr>
            </thead>

            <tbody className="table-body">
              {finances.map((expense) => {
                return (
                  <tr key={expense._id} className="table-body-row">
                    <td className="body-cell"> {expense.date} </td>
                    <td className="body-cell"> €{expense.donation} </td>
                    <td className="body-cell"> €{expense.offer} </td>
                    <td className="body-cell"> €{expense.frekdasie} </td>
                    <td className="body-cell"> €{expense.choirExpense} </td>
                    <td className="body-cell"> €{expense.eventExpense} </td>
                    <td className="body-cell">€{expense.priestExpense} </td>
                    <td className="body-cell"> €{expense.otherExpense} </td>
                    <td className={expense.total < 0 ? 'negative' : 'positive'}>
                      <strong>€{expense.total}</strong>{' '}
                    </td>
                    <td className="body-cell-action">
                      <div className="action-wrapper">
                        <NavLink to={'/users/userId'} className={'link'}>
                          View
                        </NavLink>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h4 className="total-income">
            Total Income for the year 2022 was{' '}
            <span className="total">€ {total} </span>
          </h4>
        </section>
      </section>

      {open && <AddNewFinance setOpen={setOpen} />}
    </main>
  );
};

export default Finance;
