import React, { useState } from "react";
import "./CardAppointment.css";

export const CardAppointment = ({ appointmentId, nameProduct, imageProduct, service, email, artist, date, shift }) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="card-appointment" key={appointmentId}>
            <div className="date-category">
                <div>Date: </div>
                <div className="date">{date}</div>
                <div>Service : </div>
                <div className="service">{service}</div>
            </div>
            <button className="button-spoiler" onClick={toggleCollapse}>
                {collapsed ? "Show more" : "Hide"}
            </button>
            {!collapsed && (
                <div className="card-appointment-right">
                    <img className="photo" src={imageProduct} alt={nameProduct} />
                    <div className="nameProduct">{nameProduct}</div>
                    <div className="email">{email}</div>
                    <div className="tattoo-artist-card-container">
                        <div>Tattoo artist</div>
                        <div className="artist">{artist}</div>
                    </div>
                    {/* <div className="appointmentId">{appointmentId}</div> */}
                    <div className="shift">{shift}</div>
                </div>
            )}
        </div>
    );
};


