import React from "react";
import "./CardUser.css";

export const CardUser = ({ full_name, photo, email, phone_number, is_active, role_id }) => {
    let roleText = "";

    if (role_id === 1) {
        roleText = "Role: User";
    } else if (role_id === 2) {
        roleText = "Role: Admin / Artist";
    } else if (role_id === 3) {
        roleText = "Role: Super admin";
    }

    return (
        <div className="card-allusers row">
            <div className="card-alluser-container-photo">
                <img className="card-allusers-photo" src={photo} alt={full_name} />
            </div>

            <div className="card-allusers__content col">
                <p className="card-allusers__title">{full_name}</p>
                <p className="card-allusers__description">{email}</p>
                <p className="card-allusers__description">{phone_number}</p>
                <p className="card-allusers__description">{is_active}</p>
                <p className="card-allusers__description">{roleText}</p>
            </div>
        </div>
    );
};
