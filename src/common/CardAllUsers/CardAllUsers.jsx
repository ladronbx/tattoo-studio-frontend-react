// CardAllUsers.js

import React from "react";
import "./CardAllUsers.css";

export const CardAllUsers = ({ full_name, photo, email, phone_number, is_active, role_id }) => {
  return (
    <div className="CardAllUsers">
      <div className="CardAllUsers__content">
        <p className="CardAllUsers__title">{full_name}</p>
        <p className="CardAllUsers__description">{email}</p>
        <p className="CardAllUsers__description">{phone_number}</p>
        <p className="CardAllUsers__description">{is_active}</p>
        {/* <p className="CardAllUsers__description">{role_id}</p> */}
      </div>
      <img className="CardAllUsers__photo" src={photo} alt={full_name} />
    </div>
  );
};
