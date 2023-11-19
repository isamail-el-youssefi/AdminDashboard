import { useState, useEffect } from "react";
import DataTable from "../../components/dataTable/DataTable";
import axios from "axios";

const columns = [
  { field: "_id", headerName: "ID", width: 260 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "first_name",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "last_name",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 270,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 160,
    type: "string",
  },
  {
    field: "active",
    headerName: "Active",
    width: 150,
    type: "boolean",
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/customers");
        console.log(response.data);
        if (response.data) {
          const customerWithId = response.data.Customers.map((customer) => ({
            ...customer,
            id: customer._id,
          }));
          setCustomers(customerWithId);
          setIsLoading(false);
        } else {
          setError("Failed to fetch customer data.");
          setIsLoading(false);
          console.log(response.status);
        }
      } catch (error) {
        setError("Error: " + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/v1/customers/${id}`
      );

      if (response.status === 200) {
        const deleteCustomer = customers.filter(
          (customer) => customer.id !== id
        );
        setCustomers(deleteCustomer);
        console.log(`Customer with ID ${id} has been deleted successfully!`);
      } else {
        console.error(`Failed to delete customer with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting customer with ID ${id}: ${error.message}`);
    }
  };

  return (
    <div className="customers">
      <div className="info">
        <h1>Customers</h1>
      </div>
      <DataTable
        slug="customers"
        columns={columns}
        rows={customers}
        getRowId={(row) => row.id}
        onDelete={handleDelete}
      />
    </div>
  );
}
