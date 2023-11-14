import React from "react";
import "./CardArtist.css";

export const CardArtist = ({ full_name, photo, email, phone_number, is_active, role_id  }) => {
  return (
    <div className="card-artist">
      <img className="card-artist-photo" src={photo} alt={full_name} />
        <div className="card-artist-content">
        <p className="card-artist-title">{full_name}</p>
        <p className="card-artist-description">{email}</p>
        <p className="card-artist-description">{phone_number}</p>
        <p className="card-artist-description">{is_active}</p>
        <p className="card-artist-description">{role_id}</p>
      </div>
    </div>
  );
};