import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";

export default function DataTable(props) {
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">

          <div className="update" >
            <img src="/update.svg" alt="" />
          </div>
          <div className="delete" onClick={() => props.onDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
      />
    </div>
  );
}

// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import "./dataTable.scss";
// import { Link } from "react-router-dom";

// export default function DataTable(props) {
//   const handleDelete = (id) => {
//     //delete the item
//     //axios.delete(`/v1/${slug}/id`)
//     console.log(id + "has been deleted!");
//   };

//   const actionColumn = {
//     field: "action",
//     headerName: "Action",
//     width: 200,
//     renderCell: (params) => {
//       return (
//         <div className="action">
//           <Link to={`/${props.slug}/${params.row.id}`}>
//             <img src="/view.svg" alt="" />
//           </Link>
//           <div className="delete" onClick={() => handleDelete(params.row.id)}>
//             <img src="/delete.svg" alt="" />
//           </div>
//         </div>
//       );
//     },
//   };

//   return (
//     <div className="dataTable">
//       <DataGrid
//         className="dataGrid"
//         rows={props.rows}
//         columns={[...props.columns, actionColumn]}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         slots={{ toolbar: GridToolbar }}
//         //search area
//         slotProps={{
//           toolbar: {
//             showQuickFilter: true,
//             quickFilterProps: { debounceMs: 500 },
//           },
//         }}
//         pageSizeOptions={[5]}
//         checkboxSelection
//         disableRowSelectionOnClick
//         disableColumnFilter
//         disableColumnSelector

//       />
//     </div>
//   );
// }
