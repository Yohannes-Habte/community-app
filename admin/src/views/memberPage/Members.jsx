import React, { useEffect, useState } from 'react';
import './Members.scss';
import Menu from '../../components/menu/Menu';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import AddNewMember from '../../components/addNew/AddNewMember';

const Members = () => {
  // Local state variable
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);

  // Display sacraments reports to the frontend
  useEffect(() => {
    const fetchSpiritualDevelopments = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/members');
        console.log(data);
        setMembers(data);
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
        `http://localhost:4000/api/members/${Id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="users-page">
      <Menu />
      <div className="user-container">
        <section className="user-info">
          <h3 className="users-title"> Church Members </h3>
          <button onClick={() => setOpen(true)} className="add-user-btn">
            Add New
          </button>
        </section>

        <table className="user-info-table">
          <thead className="table-head">
            <tr className="table-head-row">
              <th className="head-cell"> First Name </th>
              <th className="head-cell"> Last Name </th>
              <th className="head-cell"> Email </th>
              <th className="head-cell"> Phone </th>
              <th className="head-cell"> Street </th>
              <th className="head-cell"> Zip Code </th>
              <th className="head-cell"> City </th>
              <th className="head-cell"> State </th>
              <th className="head-cell"> Country </th>
              <th className="head-cell"> Action </th>
            </tr>
          </thead>

          <tbody className="table-body">
            {members.map((user) => {
              return (
                <tr key={user._id} className="table-body-row">
                  <td className="body-cell"> {user.firstName} </td>
                  <td className="body-cell"> {user.lastName} </td>
                  <td className="body-cell"> {user.email} </td>
                  <td className="body-cell"> {user.phone} </td>
                  <td className="body-cell"> {user.street} </td>
                  <td className="body-cell"> {user.zipCode} </td>
                  <td className="body-cell"> {user.city} </td>
                  <td className="body-cell"> {user.state} </td>
                  <td className="body-cell"> {user.country} </td>
                  <td className="body-cell-action">
                    <div className="action-wrapper">
                      <NavLink to={'/spirituals/id'} className={'link'}>
                        View
                      </NavLink>
                      <button
                        onClick={() => handleDelete(user._id)}
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
      </div>{' '}
      {open && <AddNewMember setOpen={setOpen} />}
    </main>
  );
};

export default Members;
