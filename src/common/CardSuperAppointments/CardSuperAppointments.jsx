import React, { useState } from "react";
import "./CardSuperAppointments.css";
import { LinkButton } from "../LinkButton/LinkButton";

export const CardSuperAppointments = ({ appointmentId, nameProduct, imageProduct, category, email, artist_name, date, shift, price, emit, client_name, user_email, status }) => {

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
                <div className="category">{category}</div>
                {/* <div>Artist name : </div>
                <div className="artist_name">{artist_name}</div> */}
                <div>Client name : </div>
                <div className="client_name">{client_name}</div>
                <div>Client email</div>
                <div className="user_email">{user_email}</div>
                <div>Status : </div>
                <div className="status">{status}</div>
            </div>
            <button className="button-spoiler" onClick={toggleCollapse}>
                {collapsed ? "Details" : "Hide"}
            </button>
            {!collapsed && (
                <div className="card-appointment-right">
                    <img className="photo" src={imageProduct} alt={nameProduct} />
                    <div className="nameProduct">{nameProduct}</div>
                    <div className="price">{price}€</div>
                    <div className="email">{email}</div>
                    <div className="tattoo-artist-card-container">
                        <div>Tattoo artist</div>
                        <div className="artist_name">{artist_name}</div>
                    </div>
                    {/* <div className="appointmentId">{appointmentId}</div> */}
                    <div className="shift">{shift}</div>

                    <LinkButton
                        classButton={"button-update-appointment"}
                        path={"/update-appointment"}
                        title={<div className="button-update-appointment" > <img src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png" alt="" />
                        </div>}
                        emit={() => emit()}
                    />

                </div>
            )}
        </div>
    );
};
