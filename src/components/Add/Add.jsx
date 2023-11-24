// Importing necessary modules and styles
import React, { useState } from "react";
import axios from "axios";
import "./Add.scss";

// Functional component named Add
export default function Add (props) {
  // State hook to manage form data
  const [formData, setFormData] = useState({});

  // Event handler for input changes
  const handleInputChange = (e) => {
    // Updating form data based on input changes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Async function to add a new entity
  const addNewEntity = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the server with form data
      const response = await axios.post(`http://localhost:4000/v1/${props.slug}s`, formData);
      
      console.log(`Added new ${props.slug}:`, response.data);
      
      // Closing the modal or performing any other necessary actions
      props.setOpen(false);
    } catch (error) {
      // Handling errors and logging error messages
      console.error(`Error adding new ${props.slug}:`, error.message);
      // You can also display a message to the user here
    }
  };

  // JSX for the Add component
  return (
    <div className="add">
      <div className="modal">
        {/* Close button to close the modal */}
        <span className="close" onClick={() => props.setOpen(false)}>
          <h4>X</h4>
        </span>
        
        {/* Heading for the modal */}
        <h1>Add new {props.slug}</h1>
        
        {/* Form for adding a new entity */}
        <form onSubmit={addNewEntity}>
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
          
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
