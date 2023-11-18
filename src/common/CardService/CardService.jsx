import React from "react";
import "./CardService.css";

export const CardService = ({ image, name, category, price }) => {
  return (
    <div className="card-service">
      <img className="card-service-image" src={image} alt={name} />
        <div className="card-service-content">
        <div className="card-service-title">{name}</div>
        <div className="card-service-descridivtion">{category}</div>
        <div className="card-service-description">{price}€</div>
      </div>
    </div>
  );
};