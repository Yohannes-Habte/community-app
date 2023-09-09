import React, { useEffect, useState } from 'react';
import './Sacraments.scss';
import Menu from '../../components/menu/Menu';
import DataGridTable from '../../components/dataGridTable/DataGridTable';
import { products } from '../../data/Data';
import AddNewSacrament from '../../components/addNew/AddNewSacrament';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Sacraments = () => {
  // Local state variable
  const [open, setOpen] = useState(false);
  const [sacraments, setSacraments] = useState([]);

  // Display sacraments reports to the frontend
  useEffect(() => {
    const fetchSachraments = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/sacraments'
        );
        console.log('Sacrament data are:', data);
        setSacraments(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSachraments();
  }, []);

  // Handle delete
  const handleDelete = async (Id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/spiritual-developments/${Id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="sacrament-page">
      <Menu />
      <div className="sacrament-container">
        <section className="sacrament-info">
          <h3 className="sacrament-title"> Sacrament Services </h3>
          <button onClick={() => setOpen(true)} className="add-sacrament-btn">
            Add New
          </button>
        </section>

        <table className="sacrament-report-table">
          <thead className="table-head">
            <tr className="table-head-row">
              <th className="head-cell"> Sacrament Name </th>
              <th className="head-cell"> Service Date </th>
              <th className="head-cell"> Phone </th>
              <th className="head-cell"> Beneficiary Status </th>
              <th className="head-cell"> Action </th>
            </tr>
          </thead>

          <tbody className="table-body">
            {sacraments.map((sacrament) => {
              return (
                <tr key={sacrament._id} className="table-body-row">
                  <td className="body-cell"> {sacrament.date} </td>
                  <td className="body-cell"> {sacrament.name} </td>
                  <td className="body-cell"> {sacrament.phone} </td>
                  <td className="body-cell"> {sacrament._id} </td>
                  <td className="body-cell-action">
                    <div className="action-wrapper">
                      <NavLink to={'/users/userId'} className={'link'}>
                        View
                      </NavLink>
                      <button
                        onClick={() => handleDelete(sacrament._id)}
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

        {open && <AddNewSacrament setOpen={setOpen} />}
      </div>
    </main>
  );
};

export default Sacraments;
