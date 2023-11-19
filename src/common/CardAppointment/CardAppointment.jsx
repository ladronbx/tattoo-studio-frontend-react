// CardAppointment.js
import React, { useState } from "react";
import "./CardAppointment.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { RemoveButton } from "../RemoveButton/RemoveButton";
import { EditButton } from "../EditButton/EditButton";

export const CardAppointment = ({ appointmentId, nameProduct, imageProduct, category, email, artist_name, date, shift, price, emit, remove }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        emit();
    };

    return (
        <div className="card-appointment" key={appointmentId}>
            <div className="visible-card-appointment row">
                <div className="date-and-shift col">
                    <div>{shift}</div>
                    <div>{date}</div>
                </div>
                <div className="col center-card-appointment">
                    {category}
                    <button className="button-spoiler" onClick={toggleCollapse}>
                        {collapsed ? "Details" : "Hide"}
                    </button>
                </div>
                <div className="artist_name col">
                    <div>Artist:</div>
                    <div>{artist_name}</div>
                </div>
            </div>

            {!collapsed && (
                <div className="card-appointment-details row">

                    <div className="row">
                        <div className="col">
                            <div className="nameProduct">{nameProduct}</div>
                            <img className="photo" src={imageProduct} alt={nameProduct} />
                            <div className="card-appointment-info">
                            </div>
                        </div>
                    </div>
                    <div className="row price-email-card-appointment">
                        <div className="col">
                            <div className="price-container">
                                <div className="price">{price}€</div>
                            </div>
                            <div className="tattoo-artist-email-container">
                                <div className="email-artist-card-appointment">Artist email :{email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="card-appointment-buttons row justify-content-between">
                        <div className="col">
                            <EditButton path={"/update-appointment"} />
                        </div>
                        <div className="col">
                            <div className="remove-button">
                                <RemoveButton remove={() => remove()} />
                            </div>
                        </div>
                    </div>


                </div>
            )}
        </div>
    );
};
