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

// // Single.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function Single() {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/v1/users/${userId}`);
//         if (response.data) {
//           setUser(response.data); // Set user data
//         } else {
//           // Handle error
//         }
//       } catch (error) {
//         // Handle error
//       }
//     };

//     fetchData();
//   }, [userId]); // Fetch data when the userId changes

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="single">
//       <h1>{user.first_name} {user.last_name}</h1>
//       {/* Display other user details here */}
//     </div>
//   );
// }

