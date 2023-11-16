import React, { useState } from "react";
import "./CardAppointment.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { RemoveButton } from "../RemoveButton/RemoveButton";

export const CardAppointment = ({ appointmentId, nameProduct, imageProduct, category, email, artist_name, date, shift, price, emit, remove }) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        emit()
    };

    return (
        <div className="card-appointment" key={appointmentId}>
            <div className="date-category">
                <div>Date: </div>
                <div className="date-and-shift">{shift}{date}</div>
                <div>Service : </div>
                <div className="category">{category}</div>
                <div className="tattoo-artist-card-container">
                    <div>Tattoo artist : </div>
                    <div className="artist_name">{artist_name}</div>
                </div>
            </div>
            <button className="button-spoiler" onClick={toggleCollapse}>
                {collapsed ? "Details" : "Hide"}
            </button>
            {!collapsed && (
                <div className="card-appointment-right">
                    <img className="photo" src={imageProduct} alt={nameProduct} />

                    <div className="nameProduct">{nameProduct}</div>

                    <div className="price-container">
                        <div>Price :</div>
                        <div className="price">{price}€</div>
                    </div>

                    <div className="tattoo-artist-email-container">
                        <div>Tattoo artist email</div>
                        <div className="email">{email}</div>
                    </div>

                    {/* <div className="appointmentId">{appointmentId}</div> */}

                    <LinkButton
                        classButton={"button-update-appointment"}
                        path={"/update-appointment"}
                        title={<div className="button-update-appointment" > <img src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png" alt="" />
                        </div>}
                        emit={() => emit()}
                    />

                    <RemoveButton remove={() => remove()}/>


                </div>
            )}
        </div>
    );
};
