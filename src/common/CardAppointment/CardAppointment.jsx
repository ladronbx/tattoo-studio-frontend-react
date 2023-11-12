import React from "react";
import { Spoiler } from '@mantine/core';
import "./CardAppointment.css";

export const CardAppointment = ({ appointmentId, nameProduct, imageProduct, categoryProduct, email, artist, date, shift }) => {
    return (
        <div className="card-appointment" key={appointmentId}>
            <div className="appointmentId">{appointmentId}</div>
            <div className="nameProduct">{nameProduct}</div>
            <img className="photo" src={imageProduct} alt={nameProduct} />
            <div className="categoryProduct">{categoryProduct}</div>
            <div className="email">{email}</div>
            <div className="artist">{artist}</div>
            <div className="date">{date}</div>
            <div className="shift">{shift}</div>
            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                    {/* Contenido que deseas ocultar */}
                    <p>Contenido oculto aquí...</p>
            </Spoiler>
        </div>
    );
};
