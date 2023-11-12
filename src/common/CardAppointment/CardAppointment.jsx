import React, { useState } from "react";
import "./CardAppointment.css";
import { LinkButton } from "../LinkButton/LinkButton";

export const CardAppointment = ({ appointmentId, nameProduct, imageProduct, service, email, artist, date, shift, emit}) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        emit()
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
                {collapsed ? "Details" : "Hide"}
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

                    <LinkButton
                        classButton={"button-update-appointment"}
                        path={"/updateAppointment"}
                        title={<div className="button-update-appointment" > <img src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png" alt="" /></div>}
                    />

                </div>
            )}
        </div>
    );
};


