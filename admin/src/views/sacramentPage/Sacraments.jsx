import React, { useState } from 'react'
import "./Sacraments.scss"
import Menu from '../../components/menu/Menu';
import DataGridTable from '../../components/dataGridTable/DataGridTable';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { products } from '../../data/Data';
import AddNew from '../../components/addNew/AddNew';


// Columns Data
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    width: 250,
  },
  {
    field: 'color',
    type: 'string',
    headerName: 'Color',
    width: 100,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    width: 90,
  },
  {
    field: 'producer',
    headerName: 'Producer',
    type: 'string',
    width: 120,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 120,
    type: 'string',
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    width: 90,
    type: 'boolean',
  },
];

const Sacraments = () => {
   // Local state variable
   const [open, setOpen] = useState(false);

   return (
     <main className="products-page">
       <Menu />
       <div className="products-container">
         <section className="product-info">
           <h3 className="product-title">Products</h3>
           <button onClick={() => setOpen(true)} className="add-product-btn">
             Add New Product
           </button>
         </section>
 
         {/* slug repesents to the different pages  */}
         <DataGridTable columns={columns} rows={products} slug={'products'} />
 
         {open && (
           <AddNew colums={columns} setOpen={setOpen} slug={'products'} />
         )}
       </div>
     </main>
   );
}

export default Sacraments