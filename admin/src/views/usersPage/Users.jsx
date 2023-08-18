import React, { useState } from 'react';
import './Users.scss';
import Menu from '../../components/menu/Menu';
import DataGridTable from '../../components/dataGridTable/DataGridTable';
import { userRows } from '../../data/Data';
import AddNewUser from '../../components/addNew/AddNewUser';

// Column
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Avatar',
    width: 50,
    type: 'string',
    renderCell: (params) => {
      return <img src={params.row.img || '/>noavatar.png'} alt="" />;
    },
  },

  {
    field: 'firstName',
    headerName: 'First name',
    width: 100,
    type: 'string',
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 100,
    type: 'string',
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
    type: 'string',
    editable: true,
  },

  {
    field: 'phone',
    headerName: 'Phone',
    width: 100,
    type: 'string',
    editable: true,
  },

  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 100,
    type: 'string',
    editable: true,
  },

  {
    field: 'verified',
    headerName: 'Verified',
    width: 100,
    type: 'boolean',
    editable: true,
  },

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    // This function takes all the row parameters.
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const Users = () => {
  // Local state variable
  const [users, setUser] = []
  const [open, setOpen] = useState(false);

  return (
    <main className="users-page">
      <Menu />
      <div className="user-container">
        <section className="user-info">
          <h3 className="users-title">Users</h3>
          <button onClick={() => setOpen(true)} className="add-user-btn">
            Add New
          </button>
        </section>

        {/* slug repesents to the different pages  */}
        <DataGridTable columns={columns} rows={userRows} slug={'users'} />

        {open && <AddNewUser colums={columns} setOpen={setOpen} slug={'user'} />}
      </div>
    </main>
  );
};

export default Users;
