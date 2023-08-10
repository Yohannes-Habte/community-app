import React from 'react'
import "./DataGridTable.scss"
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DataGridTable = (props) => {
 // Delete single item
 const handleDelete = async () => {
  await axios.delete(`http://localhost:3000/api/${props.slug}.id`)
 };

 // Action column
 const actionColumn = {
   field: 'action',
   headerName: 'Action',
   width: 200,
   renderCell: (params) => {
     return (
       <div className="action">
         {/* ${props.slug} represent to user page, product page, order page, post page */}
         {/* ${params.row.id} represent to userId, productId, orderId, postId */}
         <Link to={`/${props.slug}/${params.row.id}`} className='view'>
           <img src="/view.svg" alt="" />
         </Link>
         <div className="delete" onClick={() => handleDelete(params.row.id)}>
           <img src="/delete.svg" alt="" />
         </div>
       </div>
     );
   },
 };

 return (
   <div className="data-grid">
     <Box sx={{ height: 400, width: '100%' }}>
       <DataGrid
         className="data-grid-table"
         rows={props.rows}
         columns={[...props.columns, actionColumn]}
         initialState={{
           pagination: {
             paginationModel: {
               pageSize: 10,
             },
           },
         }}
         // Create search bar
         slots={{ toolbar: GridToolbar }}
         // Search a specific user or users
         slotProps={{
           toolbar: {
             showQuickFilter: true,
             quickFilterProps: { debounceMs: 500 },
           },
         }}
         // Page size
         pageSizeOptions={[5]}
         checkboxSelection
         disableRowSelectionOnClick
         // Disable some elements from the search filter
         disableColumnFilter
         disableColumnSelector
         disableDensitySelector
       />
     </Box>
   </div>
 );
}

export default DataGridTable