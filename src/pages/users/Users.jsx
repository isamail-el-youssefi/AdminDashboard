import { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/Add/Add";
import { useEffect } from "react";
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
    type: "password",
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
    field: "role",
    type: "string",
    headerName: "Role",
    width: 150,
  },
  {
    field: "user_name",
    headerName: "User name",
    width: 150,
    type: "string",
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 160,
    type: "string",
  },
];

const modalColumn = [
  {
    field: "password",
    headerName: "Password",
    width: 100,
    type: "password",
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
    width: 200,
  },
  {
    field: "user_name",
    headerName: "User name",
    width: 150,
    type: "string",
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    type: "boolean",
  },
];

export default function Users() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/users");
        console.log(response.data);
        if (response.data) {
          // Set the id property using _id from MongoDB
          const usersWithId = response.data.Users.map((user) => ({
            ...user,
            id: user._id,
          }));
          setUsers(usersWithId);
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
  }, [open]);
  

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/v1/users/${id}`
      );

      if (response.status === 200) {
        // Filter out the deleted user from the current state
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        console.log(`User with ID ${id} has been deleted successfully!`);
      } else {
        console.error(`Failed to delete user with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting user with ID ${id}: ${error.message}`);
    }
  };
  

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button className="addButton" onClick={() => setOpen(true)}>
          Add New User
        </button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={users}
        getRowId={(row) => row.id}
        onDelete={handleDelete} // Pass the delete callback function
      />
      {open && <Add slug="user" modalColumn={modalColumn} setOpen={setOpen} />}
    </div>
  );
}

// import { useState } from "react";
// import DataTable from "../../components/dataTable/DataTable";
// import { userRows } from "../../data";
// import "./Users.scss";
// import Add from "../../components/Add/Add";
// import { useEffect } from "react";
// import axios from "axios";

// const columns = [
//   { field: "_id", headerName: "ID", width: 260 },
//   {
//     field: "img",
//     headerName: "Avatar",
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || "/noavatar.png"} alt="" />;
//     },
//   },
//   {
//     field: "first_name",
//     type: "password",
//     headerName: "First name",
//     width: 150,
//   },
//   {
//     field: "last_name",
//     type: "string",
//     headerName: "Last name",
//     width: 150,
//   },
//   {
//     field: "email",
//     type: "string",
//     headerName: "Email",
//     width: 270,
//   },
//   {
//     field: "role",
//     type: "string",
//     headerName: "Role",
//     width: 150,
//   },
//   {
//     field: "user_name",
//     headerName: "User name",
//     width: 150,
//     type: "string",
//   },
//   {
//     field: "createdAt",
//     headerName: "Created at",
//     width: 160,
//     type: "string",
//   },
//   /*   {
//     field: "active",
//     headerName: "Active",
//     width: 150,
//     type: "boolean"
//   }, */
// ];

// const modalColumn = [
//   {
//     field: "password",
//     headerName: "Password",
//     width: 100,
//     type: "password",
//   },
//   {
//     field: "first_name",
//     type: "string",
//     headerName: "First name",
//     width: 150,
//   },
//   {
//     field: "last_name",
//     type: "string",
//     headerName: "Last name",
//     width: 150,
//   },
//   {
//     field: "email",
//     type: "string",
//     headerName: "Email",
//     width: 200,
//   },

//   {
//     field: "user_name",
//     headerName: "User name",
//     width: 150,
//     type: "string",
//   },
//   {
//     field: "role",
//     headerName: "Role",
//     width: 150,
//     type: "boolean",
//   },
// ];

// //const getRowId = (row) => row._id;

// export default function Users() {
//   const [open, setOpen] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/v1/users");
//         console.log(response.data);
//         if (response.data) {
//           // Set the id property using _id from MongoDB
//           const usersWithId = response.data.Users.map((user) => ({
//             ...user,
//             id: user._id,
//           }));
//           setUsers(usersWithId);
//           setIsLoading(false);
//         } else {
//           setError("Failed to fetch user data.");
//           setIsLoading(false);
//           console.log(response.status);
//         }
//       } catch (error) {
//         setError("Error: " + error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [open]);

//   console.log(users);

//   return (
//     <div className="users">
//       <div className="info">
//         <h1>Users</h1>
//         <button className="addButton" onClick={() => setOpen(true)}>
//           Add New User
//         </button>
//       </div>
//       <DataTable
//         slug="users"
//         columns={columns}
//         rows={users}
//         getRowId={(row) => row.id}
//       />
//       {/* ROWS IS FOR FETCHING DATA */}
//       {open && <Add slug="user" modalColumn={modalColumn} setOpen={setOpen} />}
//     </div>
//   );
// }
