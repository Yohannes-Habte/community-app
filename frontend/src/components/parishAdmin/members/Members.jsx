import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {  useSelector } from 'react-redux';
import PageLoader from '../../../utiles/loader/pageLoader/PageLoader';
import axios from 'axios';
import { API } from '../../../utiles/securitiy/secreteKey';


const Members = () => {
  // Global state variables
  const { membersLoading, error, } = useSelector((state) => state.user);


  // Local state variables
  const [members, setMembers] = useState([]);

  // Display all users
  useEffect(() => {
    const getAllParishioners = async () => {
      try {
        // dispatch(membersFetchStart());
        const { data } = await axios.get(`${API}/members`);
        // dispatch(membersFetchSuccess(data.users));
        setMembers(data.users);
      } catch (error) {
        // dispatch(membersFetchFailure(error.response.data.message));
      }
    };

    getAllParishioners();
  }, []);

  // Parishioners header
  const columns = [
    { field: 'id', headerName: 'User ID', width: 130 },
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'maritalStatus', headerName: 'Status', width: 100 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    { field: 'street', headerName: 'Street Name', type: 'number', width: 100 },
    { field: 'zipCode', headerName: 'Zip Code', width: 100 },
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'state', headerName: 'State', width: 100 },
    { field: 'country', headerName: 'Country', width: 100 },
    { field: 'role', headerName: 'Role', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 70,
      renderCell: () => {
        return <div className="action-wrapper"></div>;
      },
    },
  ];

  const rows = [];

  members &&
    members.forEach((parishioner) => {
      rows.push({
        id: parishioner._id,
        firstName: parishioner.firstName,
        lastName: parishioner.lastName,
        maritalStatus: parishioner.maritalStatus,
        email: parishioner.email,
        phone: parishioner.phone,
        street: parishioner.street,
        zipCode: parishioner.zipCode,
        city: parishioner.city,
        state: parishioner.state,
        country: parishioner.country,
        role: parishioner.role,
      });
    });

  return (
    <section>
      <h1>Current Members of the Eritrean Roman Catholic Church in Hamburg</h1>

      {membersLoading && <PageLoader />}

      {error ? <p className="error-message"> {error} </p> : null}

      {!membersLoading && !error && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            // Rows
            rows={rows}
            // Columns
            columns={columns}
            // Initial state
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            // Create search bar
            slots={{ toolbar: GridToolbar }}
            // Search a specific user
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            // Page size optons
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            //
          />
        </div>
      )}
    </section>
  );
};

export default Members;
