import { useState } from 'react';
import Add from '../../components/Add/Add';
import DataTable from '../../components/dataTable/DataTable';
import { products } from '../../data';
import './Products.scss'

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

export default function Products() {
  const [ open, setOpen ] = useState(false);


  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button className="addButton" onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />{" "}          {/* ROWS IS FOR FETCHING DATA */}
      {open && <Add slug="product" columns={columns} setOpen={setOpen}/>}
    </div>  )
}