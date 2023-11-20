// Update.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Update.scss";

export default function Update(props) {
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const fetchOriginalData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/v1/${props.slug}s/${props.id}`);
        setOriginalData(response.data);
      } catch (error) {
        console.error(`Error fetching original ${props.slug} data:`, error.message);
      }
    };

    fetchOriginalData();
  }, [props.id, props.slug]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateEntity = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/v1/${props.slug}s/${props.id}`, formData);
      console.log(`Updated ${props.slug} with ID ${props.id}:`, response.data);
      props.setOpen(false);
    } catch (error) {
      console.error(`Error updating ${props.slug} with ID ${props.id}:`, error.message);
    }
  };

  return (
    <div className="update">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          <h4>X</h4>
        </span>
        <h1>Update {props.slug}</h1>
        <form onSubmit={updateEntity}>
          {props.modalConfig
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.type === "boolean" ? (
                  <select
                    name={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || originalData[column.field] || ""}
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
                    value={formData[column.field] || originalData[column.field] || ""}
                  />
                )}
              </div>
            ))}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
