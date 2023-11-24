import { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/Add/Add";
import { useEffect } from "react";
import axios from "axios";
import Update from "../../components/update/Update";

const columns = [
  { field: "_id", headerName: "ID", width: 260 },
  { field: "customer_id", headerName: "Customer ID", width: 260 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  // {
  //   field: "order_items",
  //   type: "string",
  //   headerName: "First name",
  //   width: 150,
  // },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 150,
  },
  {
    field: "cart_total_price",
    type: "string",
    headerName: "Total Cart",
    width: 270,
  },
  {
    field: "status",
    type: "string",
    headerName: "Status",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 160,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    width: 160,
    type: "string",
  },
];

const updateOrdersModal = [
  {
    field: "status",
    type: "string",
    headerName: "Status",
    width: 150,
  },
];

export default function Users() {
  const [openUpdate, setOpenUpdate] = useState(false); // State for Update modal
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/orders");
        console.log(response.data);
        if (response.data) {
          const ordersWithId = response.data.Orders.map((order) => ({
            ...order,
            id: order._id,
          }));
          setOrders(ordersWithId);
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
  }, [openUpdate]); // Include openAdd and openUpdate in the dependency array



  const handleUpdate = (id) => {
    setSelectedOrderId(id);
    setOpenUpdate(true);
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Orders</h1>
      </div>
      <DataTable
        //slug="Orders"
        columns={columns}
        rows={orders}
        getRowId={(row) => row.id}
        onUpdate={handleUpdate}
      />

      {openUpdate && (
        <Update
          slugname="order"
          sluglink="orders"
          id={selectedOrderId}
          modalConfig={updateOrdersModal}
          setOpen={setOpenUpdate}
        />
      )}
    </div>
  );
}

