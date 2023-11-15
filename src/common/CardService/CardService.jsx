import React from "react";
import "./CardService.css";

export const CardService = ({ image, name, category, price }) => {
  return (
    <div className="card-service">
      <img className="card-service-image" src={image} alt={name} />
        <div className="card-service-content">
        <p className="card-service-title">{name}</p>
        <p className="card-service-description">{category}</p>
        <p className="card-service-description">{price}</p>
      </div>
    </div>
  );
};