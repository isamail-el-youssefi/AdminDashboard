// Categories.jsx

import { useState, useEffect } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/Add/Add";
import Update from "../../components/update/Update"; // Import the Update component
import axios from "axios";

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
];

export default function Categories() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v1/categories");
        console.log(response.data);
        if (response.data) {
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
  }, [openAdd, openUpdate]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/v1/categories/${id}`
      );

      if (response.status === 200) {
        const updatedCategories = categories.filter(
          (category) => category.id !== id
        );
        setCategories(updatedCategories);
        console.log(`Category with ID ${id} has been deleted successfully!`);
      } else {
        console.error(`Failed to delete category with ID ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting category with ID ${id}: ${error.message}`);
    }
  };

  const handleUpdate = (id) => {
    setSelectedCategoryId(id);
    setOpenUpdate(true);
  };

  return (
    <div className="categories">
      <div className="info">
        <h1>Categories</h1>
        <button className="addButton" onClick={() => setOpenAdd(true)}>
          Add New Category
        </button>
      </div>
      <DataTable
        slug="categories"
        columns={columns}
        rows={categories}
        getRowId={(row) => row.id}
        onDelete={handleDelete}
        onUpdate={handleUpdate} 
      />
      {openAdd && <Add slug="categorie" modalConfig={categoriesModal} setOpen={setOpenAdd} />}
      {openUpdate && (
        <Update
          slug="categorie"
          id={selectedCategoryId}
          modalConfig={categoriesModal}
          setOpen={setOpenUpdate}
        />
      )}
    </div>
  );
}
