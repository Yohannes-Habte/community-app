import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/menu/Menu';
import './Committee.scss';
import AddNewCommittee from '../../components/addNew/AddNewCommittee';

const Committee = () => {
  // Local state variable
  const [committees, setCommittees] = useState([]);
  const [open, setOpen] = useState(false);

  // Display sacraments reports to the frontend
  useEffect(() => {
    const fetchSpiritualDevelopments = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/committees');
        console.log(data);
        setCommittees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpiritualDevelopments();
  }, []);

  // Handle delete
  const handleDelete = async (Id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/committees/${Id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="committee-page">
      <Menu />
      <div className="committee-container">
        <section className="committee-info">
          <h3 className="committe-title"> Church Committees </h3>
          <button onClick={() => setOpen(true)} className="add-committee-btn">
            Add New
          </button>
        </section>

        <table className="committee-info-table">
          <thead className="table-head">
            <tr className="table-head-row">
              <th className="head-cell"> Full Name </th>
              <th className="head-cell"> Email Address </th>
              <th className="head-cell"> Phone Number </th>
              <th className="head-cell"> Service Period </th>
              <th className="head-cell"> Action </th>
            </tr>
          </thead>

          <tbody className="table-body">
            {committees.map((committee) => {
              return (
                <tr key={committee._id} className="table-body-row">
                  <td className="body-cell"> {committee.fullName} </td>
                  <td className="body-cell"> {committee.email} </td>
                  <td className="body-cell"> {committee.phone} </td>
                  <td className="body-cell"> {committee.year} </td>
                  <td className="body-cell-action">
                    <div className="action-wrapper">
                      <NavLink to={'/spirituals/id'} className={'link'}>
                        View
                      </NavLink>
                      <button
                        onClick={() => handleDelete(committee._id)}
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
      </div>
      {open && <AddNewCommittee setOpen={setOpen} />}
    </main>
  );
};

export default Committee;
