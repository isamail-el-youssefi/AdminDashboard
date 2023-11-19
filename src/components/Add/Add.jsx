import React, { useState } from "react";
import axios from "axios";
import "./Add.scss";

export default function Add(props) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addNewEntity = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/v1/${props.slug}s`, formData);
      console.log(`Added new ${props.slug}:`, response.data);
      // Close the modal or perform any other necessary actions
      props.setOpen(false);
    } catch (error) {
      console.error(`Error adding new ${props.slug}:`, error.message);
      // Handle the error or display a message to the user
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          <h4>X</h4>
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={addNewEntity}>
          {props.modalConfig
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.type === "boolean" ? (
                  <select
                    name={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || ""}
                  >
                    <option value=""></option>
                    <option value="admin">admin</option>
                    <option value="manager">manager</option>
                  </select>
                ) : (
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
