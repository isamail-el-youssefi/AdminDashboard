// Importing necessary modules and styles
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Update.scss";

export default function Update(props) {
  const [formData, setFormData] = useState({});

  // useEffect hook to fetch original data when the component mounts
  useEffect(() => {
    const fetchOriginalData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/v1/${props.sluglink}/${props.id}`);
        
        // Updating the form data with the fetched data
        setFormData(response.data);
      } catch (error) {
        console.error(`Error fetching original ${props.sluglink} data:`, error.message);
      }
    };

    // Calling the fetchOriginalData function when the component mounts or when ID or SlugLink changes
    fetchOriginalData();
  }, [props.id, props.sluglink]);

  // Event handler for input changes
  const handleInputChange = (e) => {
    // Updating form data based on input changes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Async function to update an existing entity
  const updateEntity = async (e) => {
    // Preventing the default form submission behavior
    e.preventDefault();

    try {
      // Sending a PUT request to update the entity with the specified ID
      const response = await axios.put(`http://localhost:4000/v1/${props.sluglink}/${props.id}`, formData);
      
      console.log(`Updated ${props.slug} with ID ${props.id}:`, response.data);
      
      // Closing the modal or performing any other necessary actions
      props.setOpen(false);
    } catch (error) {
      // Handling errors and logging error messages
      console.error(`Error updating ${props.slug} with ID ${props.id}:`, error.message);
    }
  };

  // JSX for the Update component
  return (
    <div className="update">
      <div className="modal">
        {/* Close button to close the modal */}
        <span className="close" onClick={() => props.setOpen(false)}>
          <h4>X</h4>
        </span>
        
        {/* Heading for the modal */}
        <h1>Update {props.slugname}</h1>
        
        {/* Form for updating an existing entity */}
        <form onSubmit={updateEntity}>
          {/* Mapping through modalConfig to render form fields */}
          {props.modalConfig
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                {/* Label for the form field */}
                <label>{column.headerName}</label>
                
                {/* Rendering different input types based on column type */}
                {column.type === "boolean" ? (
                  // Select input for boolean type
                  <select
                    name={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || ""}
                  >
                    <option value=""></option>
                    <option value="admin">admin</option>
                    <option value="manager">manager</option>
                  </select>
                ) : column.type === "active" ? (
                  // Select input for active type
                  <select
                    name={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || ""}
                  >
                    <option value=""></option>
                    <option value="true">active</option>
                    <option value="false">inactive</option>
                  </select>
                ) : (
                  // Default input for other types
                  <input
                    type={column.type}
                    name={column.field}
                    placeholder={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || ""}
                  />
                )}
              </div>
            ))}
          
          {/* Submit button for the form */}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
