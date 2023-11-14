import React from "react";
import "./CardArtist.css";

export const CardArtist = ({ full_name, photo, email, phone_number, is_active, role_id  }) => {
  return (
    <div className="card">
      <img className="card__photo" src={photo} alt={full_name} />
        <div className="card__content">
        <p className="card__title">{full_name}</p>
        <p className="card__description">{email}</p>
        <p className="card__description">{phone_number}</p>
        <p className="card__description">{is_active}</p>
        <p className="card__description">{role_id}</p>
      </div>
    </div>
  );
};