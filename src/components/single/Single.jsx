import React from "react";
import "./Single.scss";

export default function Single(props) {
  
  return (
    <div className="single">
      <div className="info">
        <div className="topInfo">
          {props.img && <img src={props.img} alt="" />}
          <h1>{props.title}</h1>
        </div>

        <div className="details">
          <div className="buttons">
            <button>Update</button>
            <button>Delete</button>
          </div>
          <div className="items">
          {Object.entries(props.info).map((item) => (
                <React.Fragment key={item[0]}>
                <div className="item">
                  <span className="itemTitle">{item[0]}:</span>
                  <span className="itemValue">{item[1]}</span>
                </div>
                <hr /> {/* Add <hr> after each item */}
              </React.Fragment>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
