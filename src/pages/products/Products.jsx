import { useState, useEffect } from "react";
import Add from "../../components/Add/Add";
import axios from "axios";
import DataTable from "../../components/dataTable/DataTable";
import Update from "../../components/update/Update";
import "./Products.scss";
import { ToastContainer } from "react-toastify";

const columns = [
  { field: "_id", headerName: "ID", width: 150 },
  { field: "sku", headerName: "SKU", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "product_name",
    type: "string",
    headerName: "Product name",
    width: 90,
  },
  {
    field: "price",
    type: "number",
    headerName: "Price",
    width: 150,
  },
  {
    field: "short_description",
    headerName: "Description",
    type: "string",
    width: 200,
  },
  {
    field: "subcategory_id",
    type: "string",
    headerName: "Subcategory ID",
    width: 200,
  },
  {
    field: "active",
    headerName: "Active",
    width: 150,
    type: "boolean",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
];

const createUpdateProductsModal = [
  // {
  //   field: "img",
  //   headerName: "Image",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  { field: "sku", headerName: "SKU", width: 90, type: "number" },

  {
    field: "product_name",
    type: "string",
    headerName: "Product name",
    width: 250,
  },
  {
    field: "price",
    type: "number",
    headerName: "Price",
    width: 150,
  },
  {
    field: "short_description",
    headerName: "Short Description",
    type: "string",
    width: 200,
  },
  {
    field: "long_description",
    headerName: "Long Description",
    type: "string",
    width: 200,
  },
  {
    field: "subcategory_id",
    type: "string",
    headerName: "Subcategory ID",
    width: 200,
  },
  {
    field: "active",
    headerName: "Active",
    width: 150,
    type: "active",
  },
];

export default function Products() {
  const [openAdd, setOpenAdd] = useState(false); // State for Add modal
  const [openUpdate, setOpenUpdate] = useState(false); // State for Update modal
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/products");
        console.log(response.data);
        if (response.data) {
          const usersWithId = response.data.Products.map((product) => ({
            ...product,
            id: product._id,
          }));
          setProducts(usersWithId);
          setIsLoading(false);
        } else {
          setError("Failed to fetch user data.");
          setIsLoading(false);
          console.log(response.status);
        }
      } catch (error) {
        setError("Error: " + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [openAdd, openUpdate]); // Include openAdd and openUpdate in the dependency array

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/v1/products/${id}`
      );

      if (response.status === 200) {
        const deletedUsers = products.filter((product) => product.id !== id);
        setProducts(deletedUsers);
        console.log(`User with ID ${id} has been deleted successfully!`);
      } else {
        console.error(`Failed to delete user with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting user with ID ${id}: ${error.message}`);
    }
  };

  const handleUpdate = (id) => {
    setSelectedProductId(id);
    setOpenUpdate(true);
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button className="addButton" onClick={() => setOpenAdd(true)}>
          Add New Product
        </button>
      </div>
      <DataTable
        //slug="Users"
        columns={columns}
        rows={products}
        getRowId={(row) => row.id}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      {openAdd && (
        <Add
          slug="Product"
          modalConfig={createUpdateProductsModal}
          setOpen={setOpenAdd}
        />
      )}
      {openUpdate && (
        <Update
          slugname="product"
          sluglink="products"
          id={selectedProductId}
          modalConfig={createUpdateProductsModal}
          setOpen={setOpenUpdate}
        />
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={1200}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
