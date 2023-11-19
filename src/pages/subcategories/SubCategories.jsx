import { useState, useEffect } from "react";
import DataTable from "../../components/dataTable/DataTable";
import axios from "axios";
import Add from "../../components/Add/Add";

const columns = [
  { field: "_id", headerName: "ID", width: 260 },
  {
    field: "subcategory_name",
    type: "string",
    headerName: "SubCategory name",
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
  {
    field: "category_id",
    headerName: "Category Boss",
    width: 150,
    type: "string",
  },
];

const subCategoriesModal = [
  {
    field: "subcategory_name",
    type: "string",
    headerName: "SubCategory name",
    width: 150,
  },
  {
    field: "category_id",
    headerName: "Category Boss",
    width: 150,
    type: "string",
  },
];

export default function Subcategories() {
  const [open, setOpen] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/v1/subcategories"
        );
        console.log(response.data);
        if (response.data) {
          // Update the property access to match the server response
          const subcategoriesWithId = response.data.subCategories.map(
            (subCategories) => ({
              ...subCategories,
              id: subCategories._id,
            })
          );
          setSubcategories(subcategoriesWithId);
          setIsLoading(false);
        } else {
          setError("Failed to fetch subcategory data.");
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
        `http://localhost:4000/v1/subcategories/${id}`
      );

      if (response.status === 200) {
        const deleteSubcategory = subcategories.filter(
          (subcategory) => subcategory.id !== id
        );
        setSubcategories(deleteSubcategory);
        console.log(`Subcategory with ID ${id} has been deleted successfully!`);
      } else {
        console.error(`Failed to delete subcategory with ID ${id}`);
      }
    } catch (error) {
      console.error(
        `Error deleting subcategory with ID ${id}: ${error.message}`
      );
    }
  };

  return (
    <div className="subcategories">
      <div className="info">
        <h1>SubCategories</h1>
        <button className="addButton" onClick={() => setOpen(true)}>
          Add New SubCategory
        </button>
      </div>
      <DataTable
        slug="subcategories"
        columns={columns}
        rows={subcategories}
        getRowId={(row) => row.id}
        onDelete={handleDelete}
      />
      {open && <Add slug="subcategorie" modalConfig={subCategoriesModal} setOpen={setOpen} />
      }
    </div>
  );
}
