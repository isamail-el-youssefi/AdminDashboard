import { useState, useEffect } from "react";
import DataTable from "../../components/dataTable/DataTable";
import axios from "axios";
import Add from "../../components/Add/Add";

const columns = [
  { field: "_id", headerName: "ID", width: 260 },
  {
    field: "category_name",
    type: "string",
    headerName: "Category name",
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
    field: "active",
    headerName: "Active",
    width: 150,
    type: "boolean",
  },
];
const categoriesModal = [
  {
    field: "category_name",
    type: "string",
    headerName: "Category name",
    width: 150,
  },
//   {
//     field: "active",
//     headerName: "Active",
//     width: 150,
//     type: "boolean",
//   },
];

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/categories");
        console.log(response.data);
        if (response.data) {
          // Update the property access to match the server response
          const categoriesWithId = response.data.categories.map((category) => ({
            ...category,
            id: category._id,
          }));
          setCategories(categoriesWithId);
          setIsLoading(false);
        } else {
          setError("Failed to fetch category data.");
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
        `http://localhost:4000/v1/categories/${id}`
      );

      if (response.status === 200) {
        const deleteCategory = categories.filter(
          (category) => category.id !== id
        );
        setCategories(deleteCategory);
        console.log(`Category with ID ${id} has been deleted successfully!`);
      } else {
        console.error(`Failed to delete category with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting category with ID ${id}: ${error.message}`);
    }
  };

  return (
    <div className="categories">
      <div className="info">
        <h1>Categories</h1>
        <button className="addButton" onClick={() => setOpen(true)}>
          Add New Category
        </button>
      </div>
      <DataTable
        slug="categories"
        columns={columns}
        rows={categories}
        getRowId={(row) => row.id}
        onDelete={handleDelete}
      />
      {open && <Add slug="categorie" modalConfig={categoriesModal} setOpen={setOpen} />}
    </div>
  );
}
