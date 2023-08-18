import React, { useState } from 'react';
import './Spirituals.scss';
import Menu from '../../components/menu/Menu';
import { NavLink } from 'react-router-dom';
import AddNewSpiritual from '../../components/addNew/AddNewSpiritual';

const Spirituals = () => {
  // Local state variables
  const [count, setCount] = useState();
  const [spirituals, setSpirituals] = useState([]);
  const [open, setOpen] = useState(false);
  return (
    <main className="spiritual-page">
      <Menu />
      <section className="spiritual-container">
        <h1 className="spiritual-title">Spiritual Developments</h1>
        <div className="spiritual-table">
          <article className="add-spiritual">
            <h3 className="add-title"> Spiritual Development Reports </h3>
            <button onClick={() => setOpen(true)} className={'link'}>
              Add New
            </button>
          </article>

          <table className="spiritual-report-table">
            <thead className="table-head">
              <tr className="table-head-row">
                <th className="head-cell"> Id </th>
                <th className="head-cell"> Name </th>
                <th className="head-cell"> Date </th>
                <th className="head-cell"> Phone </th>
                <th className="head-cell"> Verification </th>
                <th className="head-cell"> Action </th>
              </tr>
            </thead>

            <tbody className="table-body">
              {spirituals.map((spiritual) => {
                return (
                  <tr key={spiritual._id} className="table-body-row">
                    <td className="body-cell"> {spiritual._id} </td>
                    <td className="body-cell"> {spiritual.date} </td>
                    <td className="body-cell-email"> {spiritual.name} </td>
                    <td className="body-cell-age"> {spiritual.phone} </td>
                    <td className="body-cell-city">{spiritual.userStatus}</td>
                    <td className="body-cell-action">
                      <div className="action-wrapper">
                        <NavLink to={'/spirituals/id'} className={'link'}>
                          View
                        </NavLink>
                        <button
                          //   onClick={() => handleDelete(user._id)}
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
      </section>

      {open && <AddNewSpiritual setOpen={setOpen} />}
    </main>
  );
};

export default Spirituals;
