import React from "react";
import "./CardAppointment.css";

export const CardAppointment = ({ appointmentId, nameProduct, imageProduct, categoryProduct, email, artist, date, shift  }) => {
    return (
        <div className="card" key={appointmentId}>
            <div className="appointmentId">{appointmentId}</div>
            <div className="nameProduct">{nameProduct}</div>
            <img className="photo" src={imageProduct} alt={nameProduct} />
            <div className="categoryProduct">{categoryProduct}</div>
            <div className="email">{email}</div>
            <div className="artist">{artist}</div>
            <div className="date">{date}</div>
            <div className="shift">{shift}</div>
        </div>
    );
};
