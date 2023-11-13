import React from "react";
import "./CardUser.css";

export const CardUser = ({ full_name, photo, email, phone_number }) => {
  return (
    <div className="card">
      <img className="card__photo" src={photo} alt={full_name} />
      <div className="card__content">
        <p className="card__title">{full_name}</p>
        <p className="card__description">{email}</p>
        <p className="card__description">{phone_number}</p>
      </div>
    </div>
  );
};
